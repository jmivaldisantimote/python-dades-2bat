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
import matplotlib.pyplot as _plt_save
_plt_save.show = lambda *a,**kw: None

${src}

import io as _io_save, base64 as _b64_save
_buf_save = _io_save.BytesIO()
_figs_save = [_plt_save.figure(n) for n in _plt_save.get_fignums()]
_parts_save = []
for _fig_save in _figs_save:
    _fig_save.savefig(_buf_save, format='png', bbox_inches='tight')
    _buf_save.seek(0)
    _b64_save = _b64_save.b64encode(_buf_save.read()).decode()
    _buf_save.truncate(0); _buf_save.seek(0)
    _parts_save.append('<img class="plot-img" src="data:image/png;base64,' + str(_b64_save) + '">')
    _plt_save.close(_fig_save)
'\\n'.join(_parts_save)
`;
          const result = await pyodide.runPythonAsync(wrapped);
          if (result !== undefined && result !== '' && !out.trim()) {
            out += String(result);
          }
          let html = out.trim() ? '<pre>' + out.trim() + '</pre>' : '';
          let plotHtml = '';
          if (typeof result === 'string' && result.includes('<img')) {
            plotHtml = result;
          } else if (typeof result === 'string' && result !== '') {
            html = '<pre>' + result + '</pre>';
          }
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
