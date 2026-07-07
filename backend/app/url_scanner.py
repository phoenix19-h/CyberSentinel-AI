from urllib.parse import urlparse
import re
from urllib.parse import urlparse

def clean_url(url):
    parsed = urlparse(url)
    return f"{parsed.scheme}://{parsed.netloc}"

SUSPICIOUS_WORDS = [
    "login",
    "verify",
    "update",
    "secure",
    "password",
    "bank",
    "account"
]


SUSPICIOUS_TLDS = [
    ".xyz",
    ".top",
    ".click",
    ".online"
]


def analyze_url(url):
   
    url = clean_url(url)

    score = 0
    findings = []


    parsed = urlparse(url)

    domain = parsed.netloc.lower()


    # HTTPS check

    if parsed.scheme != "https":

        score += 20

        findings.append(
            "Website is not using HTTPS"
        )


    # Length check

    if len(url) > 75:

        score += 10

        findings.append(
            "URL is unusually long"
        )


    # Keyword check

    for word in SUSPICIOUS_WORDS:

        if word in url.lower():

            score += 15

            findings.append(
                f"Suspicious keyword found: {word}"
            )


    # IP address detection

    if re.match(
        r"^(?:\d{1,3}\.){3}\d{1,3}$",
        domain
    ):

        score += 25

        findings.append(
            "URL uses direct IP address"
        )


    # Suspicious TLD

    for tld in SUSPICIOUS_TLDS:

        if domain.endswith(tld):

            score += 15

            findings.append(
                f"Suspicious domain extension: {tld}"
            )


    # Final rating

    if score >= 70:

        risk="HIGH"

    elif score >=30:

        risk="MEDIUM"

    else:

        risk="LOW"


    return {

        "url":url,
        "risk_score":score,
        "risk_level":risk,
        "findings":findings

    }
    