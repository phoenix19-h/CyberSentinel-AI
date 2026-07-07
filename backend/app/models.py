from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Scan(Base):

    __tablename__ = "scans"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    url = Column(String)


    risk_score = Column(Integer)


    risk_level = Column(String)


    findings = Column(Text)


    ai_report = Column(Text)
    