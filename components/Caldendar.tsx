import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Calendar(){

    const [nowDate, setNowDate] = useState<Date>(new Date());

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const prevMonthDates = useCallback(() => {
        
        // 이전 달 마지막 날짜
        const prevMonthLastDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0);
        
        // 이전 달 마지막 날 요일 (0 - 일요일, 6 - 토요일)
        const prevMonthLastDay = prevMonthLastDate.getDay();
        
        if( prevMonthLastDay === 6 ){
            return [];
        }

        // 이전 달 마지막 날짜
        const prevMonthLastDateNumber = prevMonthLastDate.getDate();
        
        // 요일에 맞는 이전 달 마지막 날짜부터 시작
        const prevMonthDatesArr = [];
        
        // 이전 달 마지막 날짜부터 시작해서 요일에 맞춰 배열에 추가
        for (let i = prevMonthLastDateNumber - prevMonthLastDay; i <= prevMonthLastDateNumber; i++) {
            prevMonthDatesArr.push(String(i));
        }
    
        return prevMonthDatesArr;

    }, [nowDate]);

    const nextMonthDates = useCallback(()=>{
        
        const day = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 1).getDay();

        if(day === 0){
            return [];
        }

        const nextMonthDatesArr : string[] = [];

        for(let i = 0; i < 7 - day; i++){
            nextMonthDatesArr.push(String(i + 1));
        }

        return nextMonthDatesArr;

    },[nowDate])


    const nowMonthDates = useCallback(() => {
        
        const nextMonth = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 1);
  
        const lastDayOfMonth = new Date(nextMonth.getTime() - 1);
        
        const nowMonthDatesArr : number[] = []

        for(let i = 0; i < lastDayOfMonth.getDate(); i++){
            nowMonthDatesArr.push(i + 1)
        }

        return nowMonthDatesArr;

    },[nowDate])

    const monthArr : (string | number) [] = 
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
                    <Text style={styles.textWhite}>
                        {'<'}
                    </Text>
                </TouchableOpacity>    
                <Text style={styles.title}>{`${nowDate.getFullYear()}년 ${nowDate.getMonth() + 1}월`}</Text>
                <TouchableOpacity 
                    style={styles.handleButton} 
                    onPress={()=> setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth()+ 1, 1))}>
                    <Text style={styles.textWhite}>
                        {'>'}
                    </Text>
                </TouchableOpacity> 
            </View>
            <View>
                <View style={styles.container}>
                {monthArr.map((item, index) => renderItem(item, index, nowDate, selectedDate, setSelectedDate))}
                </View>
            </View>
        </SafeAreaView>
    )
}

const renderItem = (item : string | number, index : number,  nowDate : Date, selectedDate : Date, 
    setSelectedDate : Dispatch<SetStateAction<Date>>) => {
    const isString = typeof item === 'string';

    const datesEqual = 
        selectedDate.getFullYear() === nowDate.getFullYear() && 
        selectedDate.getMonth() === nowDate.getMonth() &&
        selectedDate.getDate() === nowDate.getDate()

    return (
      <TouchableOpacity key={index} style={[styles.cell, datesEqual ? styles.nowDate : null]} onPress={()=> setSelectedDate(new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate() ))}>
        <Text style={[styles.text, 
                      isString ? styles.textGray : styles.textBlack,
                     ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };


const styles = StyleSheet.create({
    
    header : {
        flexDirection : 'row',
        alignItems : 'center',
        marginBottom : 20,
        gap : 20
    },

    handleButton : {
        width : 24,
        height : 24,
        borderRadius : 999,
        backgroundColor : '#B80000',
        alignItems : 'center',
        justifyContent : 'center',
    },

    nowDate : {
        backgroundColor : 'blue',
        borderRadius : 999

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
      fontSize: 16,
      textAlign: 'center',
    },
    textGray: {
      color: 'gray',
    },
    textBlack: {
      color: 'black',
    },
    textWhite : {
      color : '#FFF',
      fontSize : 18
    }
  });
  