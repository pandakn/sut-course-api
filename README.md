# SUT COURSE API 📚

This project scrapes course data from Reg SUT.

## Getting started 🚀

Clone this repository

```zsh
git clone https://github.com/pandakn/sut-course-api.git

cd sut-course-api
```

Install dependencies using `npm`

```zsh
npm install
```

After this step, you will get `node_modules` folder in the root of the project.

### Start Project

```
docker-compose -f docker-compose.yml up
```

The applciation will run at [localhost:3000](http://localhost:3000) or you can port change

### Connect with redis-cli

```
docker exec -it redis redis-cli
```

## API Reference

#### Get Course

```http
  GET /api/courses
```

| Parameter    | Type                          | Description                                                                                                                                                     |
| :----------- | :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `acadyear`   | `string`, `required`          | The academic year for which you want to retrieve courses (e.g. 2565)                                                                                            |
| `semester`   | `string`, `required`          | The semester for which you want to retrieve courses (e.g. 3)                                                                                                    |
| `coursecode` | `string`                      | The course code pattern to filter courses (e.g. ist30 1105)                                                                                                     |
| `coursename` | `string`                      | The course name to filter courses (e.g. english\*)                                                                                                              |
| `maxrow`     | `string`                      | The maximum number of rows to return in the response (e.g. 50)                                                                                                  |
| `cmd`        | `string`, `Default = 2`       | A command that specifies the filtering method. <b>Use "1" = filter by day and times.</b> <b>Use "2" = no filter</b>                                             |
| `weekdays`   | `string`, `required if cmd=1` | The weekdays for which you want to filter courses. For example, "2" represents Monday. Use the format "1 = su, 2 = mo, 3 = tu, 4 = we, 5 = th, 6 = fr, 7 = sa". |
| `timefrom`   | `string`, `required if cmd=1` | The starting time for filtering courses. The value corresponds to a specific time. See [Time Condition](#time-condition) for details.                           |
| `timeto`     | `string`, `required if cmd=1` | The ending time for filtering courses. The value corresponds to a specific time. See [Time Condition](#time-condition) for details.                             |

## Time Condition

The time values for `timefrom` and `timeto` follow a specific representation:

- The starting time of the project (e.g., 08:00 AM) corresponds to a value of 97.
- The ending time of the project (e.g., 10:00 PM) corresponds to a value of 265.
- Each 5-minute increment corresponds to an increment of 1 in the value.

For example, to represent 12:00 AM, the value is 1. To represent 12:05 AM, the value is 2, and so on. This pattern continues for every 5 minutes throughout the day.

> **Note** : Either one of coursecode or coursename can be entered.

> **Warning** : If coursecode and coursename are not specified, scraping all the data will take a very long time.

### Examples

#### Retrieve Course Data with _No Filtering_

use the following example:

```http
GET /api/courses?acadyear=2565&semester=3&coursecode=ist30 1105&coursename=&maxrow=50
```

#### Retrieve Course Data with _Filtering_

To retrieve course data based on specific filtering criteria, use the following example:

```http
GET /api/courses?acadyear=2566&semester=1&coursecode=523*&coursename=&maxrow=50&cmd=1&weekdays=3&timefrom=109&timeto=145
```

## Usage/Examples JSON

```json
"data": {
    "year": "3/2565",
    "courseData": [
        {
            "courseCode": "IST30 1105",
            "version": "1",
            "courseNames": {
                "en": "ENGLISH FOR CAREERS",
                "th": "ภาษาอังกฤษเพื่อการทำงาน"
            },
            "credit": "3 (3-0-6)",
            "degree": "ปริญญาตรี",
            "department": "ภาษาต่างประเทศ",
            "faculty": "สำนักวิชาเทคโนโลยีสังคม",
            "courseStatus": "ใช้งาน",
            "courseCondition": [
                "IST30 1104",
                "213204",
                "203204"
            ],
            "continueCourse": [
                "224359"
            ],
            "equivalentCourse": [
                "213305",
                "IST30 1105"
            ],
            "sectionsCount": 22,
            "sections": [
                {
                    "id": "4ba96609-96bd-4687-b168-719a431a5bd6",
                    "url": "http://reg.sut.ac.th/registrar/class_info_2.asp?backto=home&option=0&courseid=1011782&coursecode=IST301105&acadyear=2565&semester=3&avs264862977=1",
                    "section": "1",
                    "status": "เปิดลงปกติ สามารถลงทะเบียนผ่าน WEB ได้",
                    "note": "(FOR INTERNATIONAL PROGRAM)",
                    "professors": [
                        "ผู้ช่วยศาสตราจารย์จินดาพร แสงกาญจนวนิช",
                        "อาจารย์Michael Sinclair Scott"
                    ],
                    "language": "EN ",
                    "seat": {
                        "totalSeat": "40",
                        "registered": "39",
                        "remain": "1"
                    },
                    "classSchedule": [
                        {
                            "day": "Mo",
                            "times": "09:00-10:00",
                            "room": "B1116"
                        },
                        {
                            "day": "We",
                            "times": "08:00-10:00",
                            "room": "B1114"
                        }
                    ],
                    "exams": {
                        "midterm": null,
                        "final": "4 ก.ค. 2566 เวลา 09:00 - 12:00 อาคาร B ห้อง N (สอบตามตารางมหาวิทยาลัย)"
                    }
                },
                {
                    "id": "cc296b26-3156-406e-a291-726d4b4f4207",
                    "url": "http://reg.sut.ac.th/registrar/class_info_2.asp?backto=home&option=0&courseid=1011782&coursecode=IST301105&acadyear=2565&semester=3&avs264862977=2",
                    "section": "2",
                    "status": "เปิดลงปกติ สามารถลงทะเบียนผ่าน WEB ได้",
                    "note": null,
                    "professors": [
                        "ผู้ช่วยศาสตราจารย์จินดาพร แสงกาญจนวนิช",
                        "ผู้ช่วยศาสตราจารย์ ดร.กุลภักดิ์ กองสุวรรณกุล"
                    ],
                    "language": "TH ",
                    "seat": {
                        "totalSeat": "41",
                        "registered": "41",
                        "remain": "0"
                    },
                    "classSchedule": [
                        {
                            "day": "Mo",
                            "times": "13:00-15:00",
                            "room": "B1114"
                        },
                        {
                            "day": "We",
                            "times": "16:00-17:00",
                            "room": "B1118"
                        }
                    ],
                    "exams": {
                        "midExam": null,
                        "finalExam": {
                            "date": "04",
                            "month": "Jul",
                            "times": "09:00-11:00",
                            "yearStr": "2566",
                            "room": "อาคาร B ห้อง B1140 (สอบตามตารางมหาวิทยาลัย)  4 ก.ค. 2566"
                        }
                    }
                },
            ]
        }
    ]
}
```

## Tech Stack

**Server:** Node, Express

[**Cheerio**](https://cheerio.js.org/) : scrape data

[**Redis**](https://redis.io/) : cache data
