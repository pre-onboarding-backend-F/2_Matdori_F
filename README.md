# 위치 기반 맛집 추천 및 맛집 조회 웹 서비스 (F팀)

위치 기반 맛집 추천 및 맛집 조회 서비스

## 목차

-   [개요](#개요)
-   [기술 스택](#기술-스택)
-   [실행 스크립트](#실행-스크립트)
-   [API 명세](#api-명세)
-   [프로젝트 진행 및 이슈 관리](#프로젝트-진행-및-이슈-관리)
-   [구현과정(설계 및 의도)](#구현과정설계-및-의도)
-   [TIL](#til)
-   [팀원](#팀원)

## 개요

위치 기반 맛집 추천 및 맛집 조회 서비스란?

-   데이터 파이프라인을 구축해 공공데이터(오픈API)를 활용하여 지역 음식점 목록을 가져오고 업데이트합니다.
-   유저는 유저 위치 반경 500미터 이내의 맛집을 랜덤으로 추천받을 수 있습니다.
-   유저는 유저 위치 기반 검색 또는 지정한 위치 기반 검색으로 다양한 맛집들의 정보를 조회할 수 있습니다.

## 기술 스택

-   언어 및 프레임워크: ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)</br>
-   데이터베이스: ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)</br>
-   개발환경: ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)</br>

## 실행 스크립트

```bash
# docker 빌드
npm run docker:build

# docker 실행
npm run docker:start
```

## API 명세

API 명세를 작성한 노션 페이지 링크입니다.

[![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)](https://www.notion.so/REST-API-08a30b7a61644fa9b718312300f2785c?pvs=4)🔗</br>

## 프로젝트 진행 및 이슈 관리

프로젝트 진행 및 이슈 관리를 작성한 타임보드 노션 페이지 링크입니다.

[![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)](https://www.notion.so/0684f37da2a3409dbc38bc584a7722b3?v=e79847da7cbd46a8b0767012083410ae&pvs=4)🔗</br>

## 구현과정(설계 및 의도)

팀원 별로 작성한 구현과정에 대한 노션 페이지 링크입니다.

-   [유저 및 맛집 평가 모듈, 점심 추천 서비스🔗](https://www.notion.so/2be6b9515b204430b6419d1cd6b1b3d6?pvs=4)
-   [시군구 목록 조회 캐싱, 맛집 상세정보 조회 캐싱🔗](https://www.notion.so/d43a682734254a3caa5ace1e2ab2854f?pvs=4)
-   [데이터 파이프 라인 구현 과정 및 캐시 모듈🔗](https://www.notion.so/bd81fccb2d4f40a3bc1e2cbb51ec5aa3?pvs=4)

## TIL

프로젝트를 진행하며 작성했던 TIL을 서로 공유할 수 있도록 노션 페이지에 정리하였습니다.

[![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)](https://www.notion.so/7744afbe99fe4030af255b39aa4c3c1a?v=621be95b6f5c4769ac6360085d9f5068&pvs=4)🔗</br>

## 팀원

<div align="center">

</br>

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) </br>

<table>
   <tr>
     <td colspan='4' align="center">
     </td>
   </tr>
   <tr>
    <td align="center"><b><a href="https://github.com/cabbage556">김태윤🔗</a></b></td>
    <td align="center"><b><a href="https://github.com/haeseung123">이해원🔗</a></b></td>
    <td align="center"><b><a href="https://github.com/DevJayKR">최준성🔗</a></b></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/cabbage556"><img src="https://avatars.githubusercontent.com/u/56855262?v=4" width="80px" /></a>
    <td align="center"><a href="https://github.com/haeseung123"><img src="https://avatars.githubusercontent.com/u/106800437?v=4" width="80px" /></a></td>
    <td align="center"><a href="https://github.com/DevJayKR"><img src="https://avatars.githubusercontent.com/u/106816875?v=4" width="80px" /></a></td>
  </tr>
</table>

</div>
<br/>
