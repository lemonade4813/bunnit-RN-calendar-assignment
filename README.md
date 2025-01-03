# 탭 네비게이션 및 캘린더 구현 과제


- 프로젝트 환경
  
  - React Native CLI
  - Node v18.20.5
  - npm v10.8.2
  - Typescript : 4.8.6
  - React Native : "0.72.17"
 
    
  - @react-navigation/bottom-tabs: "^7.2.0",
  - @react-navigation/native: "^7.0.14",
  - react-native-gesture-handler: "^2.8.0",
  - react-native-reanimated: "3.5.4",
  - react-native-safe-area-context: "^4.4.0",
  - react-native-screens: "^4.4.0",
  - react-native-svg: "^12.3.0"



## LEVEL 1: 탭 네비게이션 구현

- App.tsx 파일에 구현

## LEVEL 2: 캘린더 구현

- 구현 과정 : 

- 1) 캘린더 상단 년, 월 표시 좌우 양쪽을 버튼을 클릭하면 월의 이동이 가능합니다.
  좌우 버튼 클릭 시 nowDate(인스턴스 생성시 날짜도 포함하여 설정하므로 변수 이름을 nowMonth가 아닌 nowDate로 정의)가 설정이 되고
  선택한 월의 날짜가 캘린더에 표시됩니다.

- 2) 선택 시, prevMonthDates, prevMonthDates, nowMonthDates 함수로 UI에 표시될 날짜 배열이 생성됩니다. 
    (자바스크립트에 내장 객체 Date 함수의 getDay(), getDate() 메소드 등을 사용하였습니다. )

- 3) 날짜 배열 요소 중 이전 월 / 다음 월은 문자로, 현재 월은 숫자로 설정하여
     타입에 따라 텍스트 color, disabled 속성을 적용하였습니다. (현재 월 : 버튼 enabled, 텍스트 검정색 / 나머지 : 버튼 disabled, 텍스트 회색

- 4) 현재 월에서 임의의 날짜를 클릭하면 날짜가 selectedDate 변수에 저장합니다. 선택된 날짜인지 여부는 renderDayItem 컴포넌트에서 datesEqual 변수로 판단합니다.    


## LEVEL 3 : 월 캘린더 <-> 주 캘린더 변경(미구현)
