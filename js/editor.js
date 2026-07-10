(function () {
  let pyodide = null;
  let ready = false;

  function loadPyodide() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
    script.onload = async () => {
      try {
        pyodide = await globalThis.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/' });
        await pyodide.loadPackage(['pandas', 'numpy', 'matplotlib', 'micropip']);
        pyodide.runPythonAsync('import micropip; await micropip.install(\"seaborn\")')
          .catch(e => console.warn('seaborn no instal·lat:', e));
      } catch (e) {
        console.error('Error inicialitzant Pyodide:', e);
      }
      ready = true;
      document.querySelectorAll('.run-btn').forEach(btn => btn.disabled = false);
    };
    document.head.appendChild(script);
  }

  function setupCells() {
    document.querySelectorAll('pre:not(.static-code) > code').forEach((codeEl, i) => {
      const pre = codeEl.parentElement;
      if (pre.closest('.code-cell')) return;

      const code = codeEl.textContent.trim();
      const cell = document.createElement('div');
      cell.className = 'code-cell';

      const textarea = document.createElement('textarea');
      textarea.className = 'code-textarea';
      textarea.value = code;
      textarea.rows = code.split('\n').length;
      textarea.spellcheck = false;

      const runBtn = document.createElement('button');
      runBtn.className = 'run-btn';
      runBtn.textContent = '▶ Executa';
      runBtn.disabled = true;

      const output = document.createElement('div');
      output.className = 'code-output';

      cell.appendChild(textarea);
      cell.appendChild(runBtn);
      cell.appendChild(output);
      pre.replaceWith(cell);

      runBtn.addEventListener('click', async () => {
        if (!ready) return;
        const src = textarea.value;
        output.innerHTML = '';
        output.className = 'code-output running';
        try {
          let out = '';
          pyodide.setStdout({ batched: t => { out += t + '\n'; } });
          pyodide.setStderr({ batched: t => { out += t + '\n'; } });
          const wrapped = `
import io as _io, base64 as _b64
import matplotlib.pyplot as _plt

_plt_imgs = []
def _plt_show_capture(*a,**kw):
    _fig = _plt.gcf()
    _buf = _io.BytesIO()
    _fig.savefig(_buf, format='png', bbox_inches='tight')
    _buf.seek(0)
    _b = _b64.b64encode(_buf.read()).decode()
    _plt_imgs.append(_b)
    _buf.close()
    _plt.close(_fig)

_plt.show = _plt_show_capture

${src}

'||'.join(_plt_imgs)
`;
          const imgs = await pyodide.runPythonAsync(wrapped);
          let html = out.trim() ? '<pre>' + out.trim() + '</pre>' : '';
          if (typeof imgs === 'string' && imgs) {
            for (const b64 of imgs.split('||')) {
              if (b64) html += (html ? '\n' : '') + '<img class="plot-img" src="data:image/png;base64,' + b64 + '">';
            }
          }
          output.innerHTML = html || '(no output)';
          output.className = 'code-output success';
        } catch (err) {
          output.textContent = String(err);
          output.className = 'code-output error';
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCells);
  } else {
    setupCells();
  }
  loadPyodide();
})();
