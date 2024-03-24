from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/learning-content")
def read_learning_content():
    learing_content = [
        {"id": "LearningContent_1", "seq": 101, "contentName": "サンプル1"},
        {"id": "LearningContent_2", "seq": 102, "contentName": "サンプル2"},
        {"id": "LearningContent_3", "seq": 103, "contentName": "サンプル3"},
        {"id": "LearningContent_4", "seq": 104, "contentName": "サンプル4"},
        {"id": "LearningContent_5", "seq": 105, "contentName": "サンプル5"},
    ]
    return {"data": learing_content}

@app.get("/record")
def read_record():
    records = [
        {
            "id": "record_1",
            "date": "2024-03-01",
            "LearningContent": {
                "id": "LearningContent_1",
                "seq": 101,
                "contentName": "サンプル1（出来たのか…）",
            },
            "time": 10,
        },
        {
            "id": "record_2",
            "date": "2024-03-02",
            "LearningContent": {
                "id": "LearningContent_2",
                "seq": 101,
                "contentName": "サンプル2",
            },
            "time": 20,
        },
        {
            "id": "record_3",
            "date": "2024-03-03",
            "LearningContent": {
                "id": "LearningContent_3",
                "seq": 101,
                "contentName": "サンプル3",
            },
            "time": 30,
        },
        {
            "id": "record_4",
            "date": "2024-03-04",
            "LearningContent": {
                "id": "LearningContent_4",
                "seq": 101,
                "contentName": "サンプル4",
            },
            "time": 40,
        },
        {
            "id": "record_5",
            "date": "2024-03-05",
            "LearningContent": {
                "id": "LearningContent_5",
                "seq": 101,
                "contentName": "サンプル5",
            },
            "time": 50,
        },
    ]
    return records
