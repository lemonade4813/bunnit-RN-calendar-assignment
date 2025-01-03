import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Calendar(){

    const [nowDate, setNowDate] = useState<Date>(new Date());

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const prevMonthDates = useCallback(() => {
        
        // 이전 달 마지막 날짜
        const prevMonthLastDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0);
        
        // 이전 달 마지막 날 요일 숫자번호 (0 - 일요일, 6 - 토요일)
        const prevMonthLastDay = prevMonthLastDate.getDay();
        
        if( prevMonthLastDay === 6 ){
            return [];
        }

        // 이전 달 마지막 날짜
        const prevMonthLastDateNumber = prevMonthLastDate.getDate();
        
        // 요일에 맞는 이전 달 마지막 날짜부터 시작
        const prevMonthDatesArr = [];
        
        // 이전 달 마지막 날짜부터 시작해서 요일에 맞춰 배열에 추가 
        // 현재 월의 첫 번째 날짜가 화요일인 경우 : 0, 1 => 월요일, 화요일 생성 
        for (let i = prevMonthLastDateNumber - prevMonthLastDay; i <= prevMonthLastDateNumber; i++) {
            prevMonthDatesArr.push(String(i));
        }
    
        return prevMonthDatesArr;

    }, [nowDate]);



    const nextMonthDates = useCallback(()=>{
        
        // 선택한 월의 다음달의 첫 번째 요일의 숫자 번호(0-일요일, 6-토요일)

        const nextMonthFirstday = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 1).getDay();

        // 다음달이 첫 번째 날짜가 일요일일 경우 빈 배열 리턴
        if(nextMonthFirstday === 0){
            return [];
        }

        const nextMonthDatesArr : string[] = [];

        // 다음달의 숫자 목록 배열 생성
        /* 마지막 일자가 수요일인 경우(4) : 5, 6, 7 => 목, 금, 토 요일 배열 생성*/
        
        for(let i = 0; i < 7 - nextMonthFirstday; i++){
            nextMonthDatesArr.push(String(i + 1));
        }

        return nextMonthDatesArr;

    },[nowDate])

    
    const nowMonthDates = useCallback(() => {
    
        // 선택한 월의 다음달 인스턴스 생성
        const nextMonth = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 1);
  
        // 선택한 월(현재 월)의 마지막 일자
        const lastDayOfMonth = new Date(nextMonth.getTime() - 1);
        
        const nowMonthDatesArr : number[] = []

        // 선택한 월의 숫자 목록을 배열로 생성(1월 : 1 ~ 31일) 
        for(let i = 0; i < lastDayOfMonth.getDate(); i++){
            nowMonthDatesArr.push(i + 1)
        }

        return nowMonthDatesArr;

    },[nowDate])



    // UI에 출력할 날짜 배열 목록 => [... 이전 월 날짜 배열, ...선택한 월 날짜 목록, ... 다음 달 날짜 목록]
    //                                  (문자)              (숫자)             (문자) => 타입에 따라 표시한 스타일 다르게 적용
    const dateItemArr : (string | number) [] = 
        useMemo(()=>[
                    ...prevMonthDates(), 
                    ...nowMonthDates(), 
                    ...nextMonthDates()],
                 [prevMonthDates, 
                  nextMonthDates, 
                  nowMonthDates])

    return(
        <SafeAreaView style={{flex : 1, alignItems : 'center', justifyContent : 'center'}}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.handleButton} 
                    onPress={()=> setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth()-1, 1))}
                >
                    <Text style={styles.textButton}>
                        {'<'}
                    </Text>
                </TouchableOpacity>    
                <Text style={styles.title}>{`${nowDate.getFullYear()}년 ${nowDate.getMonth() + 1}월`}</Text>
                <TouchableOpacity 
                    style={styles.handleButton} 
                    onPress={()=> setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth()+ 1, 1))}>
                    <Text style={styles.textButton}>
                        {'>'}
                    </Text>
                </TouchableOpacity> 
            </View>
            <View>
                <View style={styles.container}>
                    <Text style={[styles.cell, {textAlign : 'center', color : '#B80000'}]}>Sun</Text>
                    <Text style={[styles.cell, {textAlign : 'center'}]}>Mon</Text>
                    <Text style={[styles.cell, {textAlign : 'center'}]}>Tue</Text>
                    <Text style={[styles.cell, {textAlign : 'center'}]}>Wed</Text>
                    <Text style={[styles.cell, {textAlign : 'center'}]}>Thu</Text>
                    <Text style={[styles.cell, {textAlign : 'center'}]}>Fri</Text>
                    <Text style={[styles.cell, {textAlign : 'center', color : '#00B6FF'}]}>Sat</Text>
                </View>
                <View style={styles.container}>
                    {dateItemArr.map((dateItem, index) => renderDayItem(dateItem, index, nowDate, selectedDate, setSelectedDate))}
                </View>
            </View>
        </SafeAreaView>
    )


}

const renderDayItem = (dateItem : string | number, index : number,  nowDate : Date, selectedDate : Date, 
    setSelectedDate : Dispatch<SetStateAction<Date>>) => {
    const isString = typeof dateItem === 'string';

    const datesEqual = 
        selectedDate.getFullYear() === nowDate.getFullYear() && 
        selectedDate.getMonth() === nowDate.getMonth() &&
        selectedDate.getDate() === dateItem

    return (
        <TouchableOpacity key={index} 
                        style={[styles.cell]} 
                        onPress={()=> 
                            setSelectedDate(
                                new Date(nowDate.getFullYear(), 
                                nowDate.getMonth(), 
                                Number(dateItem) ))
                            }
        >
        <Text style={[styles.text, 
                      isString ? styles.textGray : styles.textBlack,
                      datesEqual ? styles.nowDate : null
                     ]}>
          {dateItem}
        </Text>
      </TouchableOpacity>
    );
  };


const styles = StyleSheet.create({
    
    header : {
        flexDirection : 'row',
        alignItems : 'center',
        marginBottom : 20,
        gap : 40
    },
    

    handleButton : {
        width : 24,
        height : 24,
        borderRadius : 999,
        alignItems : 'center',
        justifyContent : 'center',
    },

    nowDate : {
        borderRadius : 999,
        borderWidth : 2,
        borderColor : '#00B6FF'
    },

    title : {
        fontSize : 20,
        color : '#000'
    },

    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    cell: {
      width: '13%', // 7개씩 가로로 배치
      padding: 5,
      alignItems: 'center',
    },
    text: {
      width : 28,
      height : 28,
      fontSize: 16,
      textAlign: 'center',
    },
    textGray: {
      color: 'gray',
    },
    textBlack: {
      color: 'black',
    },
    textButton : {
      color : '#00B6FF',
      fontSize : 18
    }
  });
  