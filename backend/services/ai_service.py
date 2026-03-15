import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "../../.env"))

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

def generate_resume_content(profile_data):
    prompt = f"""
    Generate an ATS optimized resume.
    Return the output ONLY in JSON format.
    
    GUIDELINES:
    - Summary: Provide a detailed, 3-5 sentence professional summary. It should highlight the candidate's unique value proposition, specific technical mastery (from the tech stack), and professional trajectory. Avoid generic buzzwords; use high-impact, industry-specific language.
    - Experience: Use strong action verbs and quantified achievements (e.g., "Increased efficiency by 20%" instead of "Fixed bugs").
    - Projects: Focus on the technical impact and specific technologies used.
    
    Candidate Data:
    Skills: {profile_data['skills']}
    Experience: {profile_data['experience']}
    Projects: {profile_data['projects']}
    Education: {profile_data['education']}
    Achievements: {profile_data.get('achievements', '')}
    Hobbies: {profile_data.get('hobbies', '')}
    Target Role: {profile_data['target_role']}

    JSON structure must be EXACTLY:
    {{
     "summary": "...",
     "skills": ["skill1","skill2"],
     "experience": [
      {{
       "company": "",
       "role": "",
       "duration": "",
       "points": ["achievement1","achievement2"]
      }}
     ],
     "projects":[
      {{
       "name":"",
       "tech":"",
       "description":""
      }}
     ],
     "education": [
      {{
       "college":"",
       "degree":"",
       "year":""
      }}
     ]
    }}
    """
    
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="llama-3.3-70b-versatile",
        response_format={"type": "json_object"}
    )
    return chat_completion.choices[0].message.content
