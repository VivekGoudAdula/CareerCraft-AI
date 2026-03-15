def calculate_ats_score(resume_text, target_role):
    score = 0
    suggestions = []
    
    # 1. Keyword match with target role (40 points)
    if target_role and target_role.lower() in resume_text.lower():
        score += 40
    else:
        suggestions.append(f"Add more keywords related to '{target_role}' to improve your score.")
        score += 10 # partial credit for effort
    
    # 2. Presence of sections (20 points)
    sections = ["Summary", "Skills", "Experience", "Projects", "Education"]
    found_sections = [s for s in sections if s.lower() in resume_text.lower()]
    section_points = (len(found_sections) / len(sections)) * 20
    score += section_points
    
    missing_sections = set(sections) - set(found_sections)
    if missing_sections:
        suggestions.append(f"Add missing sections: {', '.join(missing_sections)}.")
    else:
        suggestions.append("Great! All standard resume sections are present.")

    # 3. Resume length (20 points)
    words = resume_text.split()
    word_count = len(words)
    if 400 <= word_count <= 1000:
        score += 20
    elif word_count < 400:
        score += 10
        suggestions.append("Your resume is a bit short. Try expanding on your experience.")
    else:
        score += 15
        suggestions.append("Your resume is quite long. Consider making it more concise.")

    # 4. Bullet formatting (20 points)
    # Check for common bullet point characters or specific formatting in JSON/text
    # In the generated text, we often see things like "•" or " - "
    bullet_indicators = ["•", "-", "*"]
    bullet_count = sum(resume_text.count(b) for b in bullet_indicators)
    
    if bullet_count >= 10:
        score += 20
        suggestions.append("Excellent use of bullet points for readability.")
    elif bullet_count >= 5:
        score += 10
        suggestions.append("Use more bullet points to highlight achievements.")
    else:
        suggestions.append("Improve readability by using bullet points for your experience and projects.")

    return min(int(score), 100), suggestions
