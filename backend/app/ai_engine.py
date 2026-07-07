import ollama


def generate_report(data):

    prompt = f"""

You are CyberSentinel AI, a professional cybersecurity analyst.

Analyze this security scan in detail:

{data}


Create a complete security report.

Include:

1. Threat Summary
2. Risk Explanation
3. Attack Possibilities
4. Evidence Found
5. Potential Impact
6. Recommended Actions
7. Security Best Practices

Explain clearly for a security analyst.

Do not give generic advice.
Use the scan data.

"""


    response = ollama.chat(

        model="phi3",

        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ],

            options={
                "num_predict": 150
            }

    )


    return response["message"]["content"]