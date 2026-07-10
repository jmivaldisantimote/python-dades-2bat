(function () {
  let pyodide = null;
  let ready = false;

  function loadPyodide() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
    script.onload = async () => {
      document.querySelectorAll('.editor-status').forEach(el => el.textContent = 'Carregant Python...');
      pyodide = await globalThis.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/' });
      document.querySelectorAll('.editor-status').forEach(el => el.textContent = 'Carregant llibreries (pandas, numpy)...');
      await pyodide.loadPackage(['pandas', 'numpy']);
      ready = true;
      document.querySelectorAll('.run-btn').forEach(btn => btn.disabled = false);
      document.querySelectorAll('.editor-status').forEach(el => el.textContent = '');
    };
    document.head.appendChild(script);
  }

  function setupCells() {
    document.querySelectorAll('pre > code').forEach((codeEl, i) => {
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

      const status = document.createElement('span');
      status.className = 'editor-status';
      status.textContent = 'Carregant Python...';

      cell.appendChild(textarea);
      cell.appendChild(runBtn);
      cell.appendChild(status);
      cell.appendChild(output);
      pre.replaceWith(cell);

      runBtn.addEventListener('click', async () => {
        if (!ready) return;
        const src = textarea.value;
        output.innerHTML = '';
        output.className = 'code-output running';
        try {
          const result = await pyodide.runPythonAsync(src);
          if (result !== undefined) {
            output.textContent = String(result);
          }
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
