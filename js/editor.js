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
          const wrapped = `
import io as _io, sys as _sys
_io_cap = _io.StringIO()
_sys.stdout = _io_cap

import matplotlib.pyplot as _plt
_plt.show = lambda *a,**kw: None

${src}

_sys.stdout = _sys.__stdout__
_stdout = _io_cap.getvalue()

import base64 as _b64
_buf = _io.BytesIO()
_figs = [_plt.figure(n) for n in _plt.get_fignums()]
_parts = []
for _fig in _figs:
    _fig.savefig(_buf, format='png', bbox_inches='tight')
    _buf.seek(0)
    _img = _b64.b64encode(_buf.read()).decode()
    _buf.truncate(0); _buf.seek(0)
    _parts.append(f'<img class="plot-img" src="data:image/png;base64,{_img}">')
    _plt.close(_fig)

(_stdout, '\\n'.join(_parts))
`;
          const result = await pyodide.runPythonAsync(wrapped);
          let stdout = '', plotHtml = '';
          if (Array.isArray(result) && result.length === 2) {
            stdout = result[0] || '';
            plotHtml = result[1] || '';
          } else if (typeof result === 'string') {
            stdout = result;
          }
          let html = stdout ? '<pre>' + stdout.trim() + '</pre>' : '';
          if (plotHtml) {
            html += (html ? '\n' : '') + plotHtml;
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
