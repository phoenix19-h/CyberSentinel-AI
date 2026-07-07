from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import SessionLocal
from app.models import Scan
import requests
import pycountry
import socket
import dns.resolver
import requests

ABUSEIPDB_KEY = "4410d065046ed6a6de82b1a3bcbad67d8c98783fe236bd11436472b60c83d18dd1d0bada058640d1"



app = FastAPI()



# CORS

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)



@app.get("/")
def home():

    return {
        "message":"CyberSentinel API running"
    }





# =========================
# URL SCANNER
# =========================

@app.post("/scan-url")
def scan_url(data: dict):


    url = data["url"]


    score = 0
    risk = "LOW"



    suspicious_words = [

        "login",
        "verify",
        "account",
        "password",
        "secure",
        "update"

    ]



    for word in suspicious_words:

        if word in url.lower():

            score += 15




    if score >= 60:

        risk = "HIGH"


    elif score >= 30:

        risk = "MEDIUM"




    report = f"""

URL ANALYSIS REPORT

Target:
{url}


Risk Level:
{risk}


Threat Score:
{score}/100


Detected Patterns:
Suspicious keyword analysis

"""




    db = SessionLocal()



    new_scan = Scan(

        url=url,

        risk_score=score,

        risk_level=risk,

        findings="URL pattern analysis",

        ai_report=report

    )



    db.add(new_scan)

    db.commit()

    db.refresh(new_scan)

    db.close()




    return {


        "id": new_scan.id,

        "url": new_scan.url,

        "risk_score": new_scan.risk_score,

        "risk_level": new_scan.risk_level,

        "ai_report": new_scan.ai_report

    }





# =========================
# IP SCANNER
# =========================


@app.post("/scan-ip")
def scan_ip(data: dict):


    ip = data["ip"]



    url = "https://api.abuseipdb.com/api/v2/check"



    headers = {

        "Accept": "application/json",

        "Key": ABUSEIPDB_KEY

    }



    params = {

        "ipAddress": ip,

        "maxAgeInDays": 90

    }




    try:


        response = requests.get(

            url,

            headers=headers,

            params=params

        )



        result = response.json()



        info = result["data"]
        score = info["abuseConfidenceScore"]
        country_code = info.get("countryCode")
        country_name = "Unknown"
        if country_code:
            try:
                country = pycountry.countries.get(
                    alpha_2=country_code
                    )
                if country:
                    country_name = f"{country.name} ({country_code})"
            except:
                country_name = country_code



        if score >= 70:

            risk = "HIGH"


        elif score >= 30:

            risk = "MEDIUM"


        else:

            risk = "LOW"





        report = f"""

IP THREAT INTELLIGENCE


IP Address:
{ip}


Country:
{country_name}


ISP:
{info.get("isp")}


Total Reports:
{info.get("totalReports")}


Threat Score:
{score}/100


Risk:
{risk}

"""



        return {


            "ip": ip,
            "country": country_name,
            "risk_score": score,
            "risk_level": risk,
            "report": report
            }




    except Exception as e:


        return {


            "ip": ip,

            "risk_score": 0,

            "risk_level": "UNKNOWN",

            "report": f"API Error: {str(e)}"

        }
        
@app.post("/password-check")
def password_check(data: dict):


    password = data["password"]


    score = 0

    issues = []



    # length check

    if len(password) >= 12:

        score += 30

    else:

        issues.append("Password length is less than 12 characters")




    # uppercase

    if any(char.isupper() for char in password):

        score += 20

    else:

        issues.append("Missing uppercase letters")




    # lowercase

    if any(char.islower() for char in password):

        score += 15

    else:

        issues.append("Missing lowercase letters")




    # numbers

    if any(char.isdigit() for char in password):

        score += 20

    else:

        issues.append("Missing numbers")




    # symbols

    symbols="!@#$%^&*()-_+=."


    if any(char in symbols for char in password):

        score += 15

    else:

        issues.append("Missing special characters")





    if score >= 80:

        strength="STRONG"


    elif score >= 50:

        strength="MEDIUM"


    else:

        strength="WEAK"




    return {


        "password_score":score,

        "strength":strength,

        "issues":issues

    }
    
@app.post("/email-scan")
def email_scan(data: dict):


    email = data["email"]


    score = 0

    findings = []



    suspicious_words = [

        "urgent",
        "verify",
        "password",
        "account",
        "suspended",
        "click",
        "login",
        "bank",
        "confirm",
        "update"

    ]



    for word in suspicious_words:


        if word in email.lower():

            score += 10

            findings.append(
                f"Suspicious keyword detected: {word}"
            )




    # link detection

    if "http://" in email or "https://" in email:

        score += 25

        findings.append(
            "Contains external link"
        )




    if "password" in email.lower():

        score += 20

        findings.append(
            "Requests password information"
        )
        
        
    # limit score to 100
    if score > 100:
        score = 100





    if score >= 70:

        risk="HIGH"


    elif score >= 40:

        risk="MEDIUM"


    else:

        risk="LOW"





    report=f"""

PHISHING EMAIL ANALYSIS


Threat Score:
{score}/100


Risk:
{risk}


Detected Issues:

{chr(10).join(findings)}

"""



    return {


        "score":score,

        "risk":risk,

        "report":report,

        "findings":findings

    }
    


@app.post("/port-scan")
def port_scan(data: dict):

    target = data.get("target")


    ports_to_scan = [

        21,
        22,
        23,
        25,
        53,
        80,
        110,
        139,
        143,
        443,
        445,
        3306,
        3389,
        8080,
        8443,
        9929

    ]


    services = {

        21:"FTP",
        22:"SSH",
        23:"TELNET",
        25:"SMTP",
        53:"DNS",
        80:"HTTP",
        110:"POP3",
        139:"NETBIOS",
        143:"IMAP",
        443:"HTTPS",
        445:"SMB",
        3306:"MYSQL",
        3389:"RDP",
        8080:"HTTP-PROXY",
        8443:"HTTPS",
        9929:"NMAP TEST"

    }


    results=[]


    for port in ports_to_scan:


        try:


            sock = socket.socket(
                socket.AF_INET,
                socket.SOCK_STREAM
            )


            sock.settimeout(1)


            connection = sock.connect_ex(
                (target,port)
            )


            if connection == 0:


                results.append({

                    "port":port,

                    "service":services.get(
                        port,
                        "UNKNOWN"
                    ),

                    "status":"OPEN"

                })


            sock.close()


        except Exception as e:

            pass



    count=len(results)



    if count >=5:

        risk="HIGH"


    elif count >=2:

        risk="MEDIUM"


    else:

        risk="LOW"



    return {

        "target":target,

        "open_ports":count,

        "risk":risk,

        "results":results

    }
    
@app.post("/dns-scan")
def dns_scan(data:dict):

    domain = data.get("domain")


    result = {

        "domain": domain,

        "a_records": [],

        "mx_records": [],

        "ns_records": [],

        "txt_records": [],

        "risk":"LOW"

    }


    try:

        answers = dns.resolver.resolve(
            domain,
            "A"
        )

        for r in answers:

            result["a_records"].append(
                str(r)
            )


    except:
        pass



    try:

        answers = dns.resolver.resolve(
            domain,
            "MX"
        )

        for r in answers:

            result["mx_records"].append(
                str(r)
            )


    except:
        pass




    try:

        answers = dns.resolver.resolve(
            domain,
            "NS"
        )

        for r in answers:

            result["ns_records"].append(
                str(r)
            )


    except:
        pass





    try:

        answers = dns.resolver.resolve(
            domain,
            "TXT"
        )

        for r in answers:

            result["txt_records"].append(
                str(r)
            )


    except:
        pass




    if len(result["txt_records"]) == 0:

        result["risk"]="MEDIUM"


    return result
@app.post("/header-scan")
def header_scan(data:dict):

    url = data.get("url")


    try:

        response = requests.get(
            url,
            timeout=5
        )


        headers = response.headers


        checks = {

            "HTTPS":
                url.startswith("https"),

            "HSTS":
                "strict-transport-security" in headers,

            "CSP":
                "content-security-policy" in headers,

            "X-Frame-Options":
                "x-frame-options" in headers,

            "X-Content-Type-Options":
                "x-content-type-options" in headers

        }


        score = 0
        issues=[]


        for key,value in checks.items():

            if value:

                score += 20

            else:

                issues.append(
                    key + " missing"
                )



        risk="LOW"


        if score < 40:

            risk="HIGH"

        elif score < 70:

            risk="MEDIUM"



        return {


            "url":url,

            "score":score,

            "risk":risk,

            "headers":checks,

            "issues":issues

        }



    except Exception as e:


        return {

            "url":url,

            "score":0,

            "risk":"HIGH",

            "error":str(e)

        }
        
@app.post("/tech-detect")
def tech_detect(data:dict):

    url=data.get("url")


    try:

        r=requests.get(
            url,
            timeout=5
        )


        headers=r.headers


        technologies=[]



        server=headers.get(
            "server"
        )


        powered=headers.get(
            "x-powered-by"
        )



        if server:

            technologies.append(
                f"Server: {server}"
            )



        if powered:

            technologies.append(
                f"Powered By: {powered}"
            )



        html=r.text.lower()



        if "wordpress" in html:

            technologies.append(
                "CMS: WordPress"
            )


        if "react" in html:

            technologies.append(
                "Framework: React"
            )


        if "jquery" in html:

            technologies.append(
                "Library: jQuery"
            )



        return {

            "url":url,

            "technologies":technologies,

            "risk":"LOW"

        }



    except Exception as e:


        return {

        "error":str(e)

        }
        
import requests
import time


@app.post("/cve-check")
def cve_check(data: dict):

    product = data.get("product")


    try:

        url = "https://services.nvd.nist.gov/rest/json/cves/2.0"


        params = {

            "keywordSearch": product,

            "resultsPerPage": 5

        }


        response = requests.get(

            url,

            params=params,

            timeout=60,

            headers={
                "User-Agent":
                "CyberSentinel-AI/1.0"
            }

        )


        print("NVD STATUS:", response.status_code)



        if response.status_code != 200:

            return {

                "product":product,

                "risk":"API ERROR",

                "count":0,

                "cves":[]

            }



        data=response.json()



        cves=[]



        for item in data.get("vulnerabilities",[]):


            cve=item["cve"]


            score="N/A"


            try:

                score = (
                cve["metrics"]
                ["cvssMetricV31"][0]
                ["cvssData"]
                ["baseScore"]
                )


            except:

                pass



            cves.append({

                "id":
                cve["id"],

                "summary":
                cve["descriptions"][0]["value"],

                "severity":
                score

            })




        count=len(cves)



        if count >=5:

            risk="HIGH"

        elif count>0:

            risk="MEDIUM"

        else:

            risk="LOW"



        return {


            "product":product,

            "risk":risk,

            "count":count,

            "cves":cves

        }



    except Exception as e:


        print("CVE ERROR:",e)


        return {

            "product":product,

            "risk":"ERROR",

            "count":0,

            "cves":[]

        }