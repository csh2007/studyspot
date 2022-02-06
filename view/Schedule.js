import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import styled from "styled-components";
import { Agenda } from "react-native-calendars";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

// #region styled-component 부분

const CenteredView1 = styled.SafeAreaView`
  flex: 1;
`;

const CenteredView2 = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
`;

const ButtonView = styled.View`
  align-items: flex-end;
  margin-right: 20px;
`;

const AddButton1 = styled.TouchableOpacity`
  width: 70px;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin-right: 5%;
  margin-bottom: 10%;
  border-radius: 10px;
  background-color: #ff9494;
`;

const AddText = styled.Text`
  font-size: 23px;
  color: white;
`;
const AddButton2 = styled.TouchableOpacity`
  width: 200px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #ff9494;
`;

const AddValue = styled.TextInput`
  background-color: white;
  font-size: 20px;
  width: 80%;
  height: 7%;
  border-radius: 30px;
  padding: 15px;
  margin-bottom: 30px;
`;

const SceduleBtn = styled.TouchableOpacity`
  justify-content: center;
  margin-top: 8%;
`;

const SceduleTxt = styled.Text`
  justify-content: center;
`;
// #endregion

const Schedule = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [scheduleList, setScheduleList] = useState({});

  //Modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //일정추가
  const addSchedule = () => {
    try {
      // 여기서부터 scheduleList에 값 추가
      var _scheduleList = { ...scheduleList };
      if (_scheduleList[day]) {
        _scheduleList[day].push({ time, name, content });
      } else {
        _scheduleList[day] = [{ time, name, content }];
      }

      const jsonValue = JSON.stringify(_scheduleList);
      console.log(_scheduleList);
      AsyncStorage.setItem("@spot_key", jsonValue);

      setScheduleList(scheduleList);
      toggleModal();
      getData();
    } catch (e) {
      console.log("err: " + e);
    }
  };

  useEffect(() => {
    getData();
    allClear();
    console.log(scheduleList);
  }, []);

  //일정 추가 모달의 모든 내용 삭제
  const allClear = () => {};

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@spot_key");
      console.log(value);
      if (value !== null) {
        setScheduleList(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
      console.log("err: " + e);
    }
  };

  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  return (
    <CenteredView1>
      <Agenda
        theme={{
          selectedDayBackgroundColor: "#ff9494",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#ff9494",
          dotColor: "#ff9494",
          agendaDayTextColor: "#ff9494",
          agendaDayNumColor: "#ff9494",
          agendaTodayColor: "#ff9494",
          agendaKnobColor: "#ff9494",
        }}
        items={scheduleList}
        renderItem={(items) => {
          return (
            <View>
              <SceduleBtn
                onLongPress={() => {
                  console.log("클릭");
                }}
              >
                <SceduleTxt>{items.time}</SceduleTxt>
                <SceduleTxt>{items.name}</SceduleTxt>
                <SceduleTxt>{items.content}</SceduleTxt>
              </SceduleBtn>
            </View>
          );
        }}
      />

      <ButtonView>
        <AddButton1 onPress={toggleModal}>
          <AddText>추가</AddText>
        </AddButton1>
        <Modal isVisible={isModalVisible} style={{}}>
          <CenteredView2 style={{ flex: 1 }}>
            <AddValue
              placeholder="날짜를 입력하세요. ex)2021-05-13"
              value={day}
              onChangeText={setDay}
            ></AddValue>
            {/* <TouchableOpacity style={{backgroundColor:'black'}} onPress={MinCalendar}><Text>달력</Text></TouchableOpacity> */}
            <AddValue
              placeholder="시간을 입력하세요. ex)17:00~20:00"
              value={time}
              onChangeText={setTime}
            ></AddValue>
            <AddValue
              placeholder="일정명을 입력하세요."
              title="name"
              value={name}
              onChangeText={setName}
            ></AddValue>
            <AddValue
              placeholder="일정내용을 입력하세요."
              value={content}
              onChangeText={setContent}
            ></AddValue>
            <AddButton2
              title="addandback"
              onPress={() => {
                addSchedule();
              }}
            >
              <AddText>일정 추가</AddText>
            </AddButton2>
            <AddButton2
              title="back"
              onPress={toggleModal}
              style={{ marginTop: 10 }}
            >
              <AddText>취소</AddText>
            </AddButton2>
          </CenteredView2>
        </Modal>
      </ButtonView>
    </CenteredView1>
  );
};

export default Schedule;
