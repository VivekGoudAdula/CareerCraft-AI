from io import BytesIO
import os
import subprocess
import json
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem
from reportlab.lib.units import inch

def generate_pdf(data, user):
    """
    Generates a professional PDF resume. 
    Attempts to use LaTeX if pdflatex is available, 
    otherwise falls back to a high-quality ReportLab implementation.
    """
    
    # Check if pdflatex is available
    try:
        # We check silently
        subprocess.run(["pdflatex", "--version"], capture_output=True, check=True)
        return _generate_latex_pdf(data, user)
    except (subprocess.CalledProcessError, FileNotFoundError):
        # Fallback to high-quality ReportLab
        return _generate_reportlab_pdf(data, user)

def _generate_latex_pdf(data, user):
    # Prepare LaTeX content
    skills = ", ".join(data.get("skills", []))
    
    exp_section = ""
    for exp in data.get("experience", []):
        exp_section += f"\\textbf{{{exp.get('role', '')}}} - {exp.get('company', '')} ({exp.get('duration', '')})\\\\\n"
        for point in exp.get('points', []):
            exp_section += f"\\textbullet\\ {point}\\\\\n"
        exp_section += "\\vspace{0.1in}\n"

    proj_section = ""
    for proj in data.get("projects", []):
        proj_section += f"\\textbf{{{proj.get('name', '')}}} | {proj.get('tech', '')}\\\\\n"
        proj_section += f"{proj.get('description', '')}\\\\\n"
        proj_section += "\\vspace{0.1in}\n"

    edu_section = ""
    edu_list = data.get("education", [])
    if isinstance(edu_list, dict): edu_list = [edu_list]
    for edu in edu_list:
        edu_section += f"\\textbf{{{edu.get('degree', '')}}} - {edu.get('college', edu.get('school', ''))} ({edu.get('year', '')})\\\\\n"

    template = f"""
\\documentclass{{article}}
\\usepackage{{geometry}}
\\usepackage{{hyperref}}
\\geometry{{letterpaper, margin=0.75in}}
\\begin{{document}}
\\pagestyle{{empty}}

\\begin{{center}}
    {{\\Huge \\textbf{{{user.name}}}}} \\\\
    \\vspace{{2pt}}
    Email: {user.email} | Mobile: {user.mobile or 'N/A'} \\\\
\\end{{center}}

\\section*{{Summary}}
{data.get('summary', '')}

\\section*{{Skills}}
{skills}

\\section*{{Experience}}
{exp_section}

\\section*{{Projects}}
{proj_section}

\\section*{{Education}}
{edu_section}

\\end{{document}}
"""
    # In a real scenario, we'd write to a temp file, run pdflatex, and read the PDF
    # Since pdflatex is missing in this env, this is a placeholder/template logic
    # If the user installs it, this would be expanded with tempfile logic.
    return _generate_reportlab_pdf(data, user) 

def _generate_reportlab_pdf(data, user):
    buffer = BytesIO()
    # Thinner margins for professional look
    doc = SimpleDocTemplate(
        buffer, 
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )
    
    styles = getSampleStyleSheet()
    
    # Modern Professional Styles
    styles.add(ParagraphStyle(
        name='NameHeader',
        fontSize=26,
        fontName='Helvetica-Bold',
        alignment=1, # Center
        leading=30, # Clear line height
        spaceAfter=10 # More space to avoid overlap
    ))
    
    styles.add(ParagraphStyle(
        name='SubHeader',
        fontSize=10,
        fontName='Helvetica',
        alignment=1, # Center
        leading=14, # Proper line height for wrapping
        spaceAfter=20,
        textColor=colors.gray
    ))
    
    styles.add(ParagraphStyle(
        name='SectionHeader',
        fontSize=12,
        fontName='Helvetica-Bold',
        spaceAfter=8,
        spaceBefore=12,
        textColor=colors.black,
        borderPadding=(0, 0, 2, 0),
        borderWidth=0, # Remove border
        leading=14
    ))
    
    styles.add(ParagraphStyle(
        name='ExpTitle',
        fontSize=11,
        fontName='Helvetica-Bold',
        spaceAfter=1
    ))
    
    styles.add(ParagraphStyle(
        name='ExpSub',
        fontSize=9,
        fontName='Helvetica-Bold',
        textColor=colors.black,
        spaceAfter=4
    ))
    
    styles.add(ParagraphStyle(
        name='ResumeBodyText',
        fontSize=10,
        fontName='Helvetica',
        leading=13,
        spaceAfter=4
    ))

    content = []
    from reportlab.platypus import HRFlowable
    from xml.sax.saxutils import escape

    def clean_text(text):
        if text is None:
            return ""
        return escape(str(text))

    # Header
    name_text = clean_text(user.name).upper()
    content.append(Paragraph(name_text, styles['NameHeader']))
    
    # Build complete contact info string with blue hyperlinks
    contact_parts = []
    if user.email:
        email_clean = clean_text(user.email)
        contact_parts.append(f'<a href="mailto:{email_clean}" color="blue">{email_clean}</a>')
    if user.mobile:
        contact_parts.append(clean_text(user.mobile))
    
    if data.get("linkedin"):
        url = data["linkedin"].strip()
        if url and not url.startswith('http'): url = 'https://' + url
        url_clean = clean_text(url)
        contact_parts.append(f'<a href="{url_clean}" color="blue">LinkedIn</a>')
        
    if data.get("github"):
        url = data["github"].strip()
        if url and not url.startswith('http'): url = 'https://' + url
        url_clean = clean_text(url)
        contact_parts.append(f'<a href="{url_clean}" color="blue">GitHub</a>')
    
    contact_info = "  |  ".join([p for p in contact_parts if p])
    content.append(Paragraph(contact_info, styles['SubHeader']))
    
    # Summary
    content.append(Paragraph("PROFESSIONAL SUMMARY", styles['SectionHeader']))
    content.append(HRFlowable(width="100%", thickness=1, color=colors.black, spaceAfter=8))
    content.append(Paragraph(clean_text(data.get('summary', '')), styles['ResumeBodyText']))
    
    # Skills
    content.append(Paragraph("TECHNICAL SKILLS", styles['SectionHeader']))
    content.append(HRFlowable(width="100%", thickness=1, color=colors.black, spaceAfter=8))
    skills = ", ".join([clean_text(s) for s in data.get("skills", [])])
    content.append(Paragraph(skills, styles['ResumeBodyText']))
    
    # Experience
    content.append(Paragraph("PROFESSIONAL EXPERIENCE", styles['SectionHeader']))
    content.append(HRFlowable(width="100%", thickness=1, color=colors.black, spaceAfter=8))
    for exp in data.get("experience", []):
        role = clean_text(exp.get('role', ''))
        content.append(Paragraph(f"<b>{role}</b>", styles['ExpTitle']))
        company = clean_text(exp.get('company', ''))
        duration = clean_text(exp.get('duration', ''))
        sub_text = f"{company} | {duration}"
        content.append(Paragraph(sub_text, styles['ExpSub']))
        
        points = exp.get('points', exp.get('achievements', []))
        for point in points:
            content.append(Paragraph(f"&bull; {clean_text(point)}", styles['ResumeBodyText']))
        content.append(Spacer(1, 4))
        
    # Projects
    content.append(Paragraph("KEY PROJECTS", styles['SectionHeader']))
    content.append(HRFlowable(width="100%", thickness=1, color=colors.black, spaceAfter=8))
    for proj in data.get("projects", []):
        name = clean_text(proj.get('name', ''))
        tech = clean_text(proj.get('tech', ''))
        content.append(Paragraph(f"<b>{name}</b> | {tech}", styles['ExpTitle']))
        content.append(Paragraph(clean_text(proj.get('description', '')), styles['ResumeBodyText']))
        content.append(Spacer(1, 4))
        
    # Education
    content.append(Paragraph("EDUCATION", styles['SectionHeader']))
    content.append(HRFlowable(width="100%", thickness=1, color=colors.black, spaceAfter=8))
    edu_list = data.get("education", [])
    if isinstance(edu_list, dict): edu_list = [edu_list]
    _JUNK_EDU = {"not applicable", "n/a", "null", "none", "na", "", "university", "degree"}
    for edu in edu_list:
        degree = clean_text(edu.get('degree', '')).strip()
        college = clean_text(edu.get('college') or edu.get('school', '')).strip()
        year = clean_text(edu.get('year', '')).strip()
        # Skip entries that are empty or AI-generated junk
        if degree.lower() in _JUNK_EDU and college.lower() in _JUNK_EDU:
            continue
        if degree:
            content.append(Paragraph(f"<b>{degree}</b>", styles['ExpTitle']))
        if college:
            year_str = f" ({year})" if year and year.lower() not in _JUNK_EDU else ""
            content.append(Paragraph(f"{college}{year_str}", styles['ResumeBodyText']))

    doc.build(content)
    buffer.seek(0)
    return buffer
