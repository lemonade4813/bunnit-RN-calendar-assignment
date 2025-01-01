import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Home from './components/Home';
import Library from './components/Library';
import Calendar from './components/Caldendar';
import MyPage from './components/MyPage';
import HomeSvg from './assets/home.svg'
import CalendarSvg from './assets/calendar.svg'
import LibrarySvg from './assets/library.svg'
import MyPageSvg from './assets/mypage.svg'


function App(): JSX.Element {
 
  const Tab = createBottomTabNavigator();

  return (

      <NavigationContainer>
        <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown : false}}> 
            <Tab.Screen name='Home' 
                component={Home} 
                options={{tabBarIcon : ()=> 
                  <HomeSvg width={20} height={20}/>, 
                  tabBarActiveTintColor : '#B80000'}}
            />
            <Tab.Screen name='Caldendar' 
                component={Calendar} 
                options={{tabBarIcon : ()=> 
                  <CalendarSvg width={20} height={20}/>, 
                  tabBarActiveTintColor : '#B80000'
                }}
                  
            />
            <Tab.Screen name='Library' 
                component={Library} 
                options={{tabBarIcon : ()=> 
                  <LibrarySvg width={20} height={20}/>, 
                  tabBarActiveTintColor : '#B80000'
                }}
            />
            <Tab.Screen name='MyPage' 
                component={MyPage} 
                options={{tabBarIcon : ()=> 
                  <MyPageSvg width={20} height={20}/>, 
                  tabBarActiveTintColor : '#B80000'
                
                }}
            />
        </Tab.Navigator>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
