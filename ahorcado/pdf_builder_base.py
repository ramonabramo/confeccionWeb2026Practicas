import os
import subprocess
import fitz

EDGE_EXE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE_EXE):
    EDGE_EXE = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

print(f"Usando Edge: {EDGE_EXE}")

CSS_GLOBAL = """
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@400;500;600;700;800&display=swap');
  @page { size: A4 portrait; margin: 0; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; color: #0f172a; background: #fff; font-size: 8.6pt; line-height: 1.4; }
  .page { width: 210mm; height: 297mm; position: relative; padding: 12mm 15mm 10mm 15mm; page-break-after: always; background: #fff; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
  .page-header { display: flex; justify-content: space-between; align-items: center; font-size: 7.5pt; font-weight: 700; color: #475569; padding-bottom: 5px; border-bottom: 1.5px solid #cbd5e1; margin-bottom: 9px; text-transform: uppercase; letter-spacing: 0.5px; }
  .page-header span.badge-header { background: #e0f2fe; color: #0369a1; padding: 2px 7px; border-radius: 4px; font-size: 7pt; font-weight: 800; }
  .page-footer { display: flex; justify-content: space-between; align-items: center; font-size: 7.5pt; color: #64748b; padding-top: 5px; border-top: 1.5px solid #cbd5e1; margin-top: 6px; }
  .content-area { flex: 1; display: flex; flex-direction: column; }
  h1 { font-size: 19pt; color: #0f172a; margin: 0 0 6px 0; font-weight: 800; letter-spacing: -0.5px; line-height: 1.2; }
  h2 { font-size: 12pt; color: #0369a1; margin: 7px 0 5px 0; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; display: flex; align-items: center; gap: 6px; }
  h3 { font-size: 9.6pt; color: #0f172a; margin: 6px 0 3px 0; font-weight: 700; }
  p { margin: 0 0 6px 0; text-align: justify; }
  .lead { font-size: 9pt; color: #334155; font-weight: 500; line-height: 1.42; background: #f8fafc; border-left: 3.5px solid #0284c7; padding: 6px 10px; border-radius: 0 6px 6px 0; margin-bottom: 7px; }
  .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 7px 10px; margin-bottom: 7px; }
  .box-tip { background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 3.5px solid #16a34a; }
  .box-warning { background: #fffbeb; border: 1px solid #fef3c7; border-left: 3.5px solid #d97706; }
  .box-info { background: #f0f9ff; border: 1px solid #e0f2fe; border-left: 3.5px solid #0284c7; }
  .box-title { font-weight: 700; font-size: 8.4pt; margin-bottom: 3px; display: flex; align-items: center; gap: 5px; }
  .box-tip .box-title { color: #15803d; }
  .box-warning .box-title { color: #b45309; }
  .box-info .box-title { color: #0369a1; }
  pre { background: #090d16; color: #f8fafc; border-radius: 6px; padding: 6px 9px; font-family: 'Fira Code', monospace; font-size: 7.3pt; line-height: 1.32; margin: 4px 0 6px 0; overflow: hidden; }
  code { font-family: 'Fira Code', monospace; font-size: 7.8pt; background: #f1f5f9; color: #0f172a; padding: 1px 4px; border-radius: 3px; border: 1px solid #e2e8f0; }
  pre code { background: transparent; color: inherit; padding: 0; border: none; font-size: inherit; }
  .kw { color: #f472b6; font-weight: 600; }
  .fn { color: #38bdf8; font-weight: 600; }
  .str { color: #a3e635; }
  .num { color: #fbbf24; }
  .cm { color: #94a3b8; font-style: italic; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
  table.custom-table { width: 100%; border-collapse: collapse; margin: 4px 0 7px 0; font-size: 7.8pt; }
  table.custom-table th, table.custom-table td { border: 1px solid #cbd5e1; padding: 4px 7px; text-align: left; }
  table.custom-table th { background: #f1f5f9; color: #0f172a; font-weight: 700; }
  table.custom-table tr:nth-child(even) td { background: #f8fafc; }
  .badge-step { background: #0284c7; color: #fff; font-weight: 800; padding: 1px 6px; border-radius: 4px; font-size: 7pt; display: inline-block; }
  .cover-card { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #fff; padding: 15px 18px; border-radius: 9px; margin-bottom: 10px; box-shadow: 0 6px 16px rgba(0,0,0,0.12); }
  .cover-card h1 { color: #fff; font-size: 19pt; margin-bottom: 4px; }
  .cover-card .author-badge { color: #38bdf8; font-weight: 700; font-size: 9.2pt; display: flex; align-items: center; gap: 6px; }
"""

def render_pdf(html_content, output_pdf):
    temp_html = "temp_render.html"
    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(html_content)
    
    cmd = [
        EDGE_EXE,
        "--headless",
        "--disable-gpu",
        "--run-all-compositor-stages-before-draw",
        f"--print-to-pdf={output_pdf}",
        "--no-pdf-header-footer",
        f"file:///{os.path.abspath(temp_html).replace(os.sep, '/')}"
    ]
    subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(output_pdf):
        doc = fitz.open(output_pdf)
        print(f"[OK] Generado {os.path.basename(output_pdf)}: {len(doc)} paginas ({os.path.getsize(output_pdf)} bytes)")
    else:
        print(f"[ERROR] No se pudo generar {output_pdf}")
    if os.path.exists(temp_html):
        os.remove(temp_html)

print("Modulo de renderizado listo.")
