import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { Calendar, DateData, LocaleConfig } from "react-native-calendars"
import { DayState } from "react-native-calendars/src/types"
import { useNavigation, useRouter, useLocalSearchParams, Link } from "expo-router";

import {api} from "../../server/api"

import { Feather } from "@expo/vector-icons"

import { ptBR } from "../../utils/localeCalendarConfig"
import LisAgenda from "../../components/ListAgenda"

LocaleConfig.locales["pt-br"] = ptBR
LocaleConfig.defaultLocale = "pt-br"

type AgendaProps = {
    "ageId": string; 
    "ageData": string; 
    "ageHora": string;  
    "ageIdUsr": number;
    "ageTitulo": string;
    "ageDescricao": string;
    "ageContato": string;
    "ageCelular": string;
    "ageLogradouro": string;
    "ageComplemento": string;
    "ageBairro": string;
    "ageCidade": string;
    "ageUf": string;
    "ageCep": string;
    "ageStatus": string;
}

type paramsProps = {
    idUsr: string;
    name: string;
    title: string;
}

export default function Calendary() {
    const [agenda, setAgenda] = useState<Array<AgendaProps>>();
    const [day, setDay] = useState<DateData>();
    
    const router = useRouter();
    const { idUsr, name, title } = useLocalSearchParams<paramsProps>();

    useEffect(() => {   
        let dia = new Date().getDate();
        let mes = new Date().getMonth() + 1;
        let ano = new Date().getFullYear();

        let auxDay = dia.toString();
        let auxMonth = mes.toString();
        let auxYear = ano.toString();
        let datNow = auxYear + '-' + auxMonth + '-' + auxDay;

        //let dia = '01';
        //let mes = '08';
        //let ano = '2024';
        //let datNow = ano + '-' + mes + '-' + dia;

        console.log('Data Inicial', datNow);
    
        api.post("/agenda",{
            datAgenda: datNow,
        }).then(response => {
            setAgenda(response.data)
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });    
    }, [])  

    useEffect(() => {   
        //let dia = new Date().getDate();
        //let mes = new Date().getMonth() + 1;
        //let ano = new Date().getFullYear();
    
        //let dia = '01';
        //let mes = '08';
        //let ano = '2024';
        let datNow = "";
   
        if (!day) {
            let dia = '01';
            let mes = '08';
            let ano = '2024';
            let datNow = ano + '-' + mes + '-' + dia;
        }else {
            datNow = day?.dateString;
        }
    
        console.log('Data Selecionada',datNow)

        api.post("/agenda",{
            datAgenda: datNow,
        }).then(response => {
            setAgenda(response.data)
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });    

    }, [day])  

    function handleDetAgenda(row: any){
    
    }

    return (
        <View className="bg-blue-950" >
            <Calendar
                renderArrow={(direction: "right" | "left") => (
                    <Feather size={24} color="#F4A460" name={`chevron-${direction}`} />
                )}
                headerStyle={{
                borderBottomWidth: 0.5,
                borderBottomColor: "#FFFFFF",
                paddingBottom: 10,
                marginBottom: 10,
                marginTop: 30,
                }}
                theme={{
                    textMonthFontSize: 18,
                    monthTextColor: "#F4A460",
                    todayTextColor: "#F06543",
                    selectedDayBackgroundColor: "#F4A460",
                    selectedDayTextColor: "#09090b",
                    arrowColor: "#FFFFFF",
                    calendarBackground: "transparent",
                    textDayStyle: { color: "#FFFFFF" },
                    textDisabledColor: "#FFFFFF",
                    arrowStyle: {
                        margin: 0,
                        padding: 0,
                    },
                }}                
                hideExtraDays
                onDayPress={setDay}
                markedDates={
                    day && {
                        [day.dateString]: { selected: true },
                    }
                }       
            />
            <View className="flex-row items-center justify-between px-3">
                <Text className="text-white text-xl ml-1 mt-3">Data selecionada: {day?.dateString} - {idUsr}</Text>
                <Link href={{pathname: "./NewAgenda",  params: { id: idUsr}}} asChild>
                    <TouchableOpacity className="flex-row items-center justify-center bg-orange-400 p-2 mt-4 rounded-full">
                        <Text className="text-black text-xs font-semibold ">Novo Agendamento</Text>
                    </TouchableOpacity>
                </Link>    
            </View>
            <View className="flex flex-col items-center bg-slate-900 ">            
                <FlatList
                    data={agenda}
                    className='w-full ml-1 mb-0'
                    horizontal={false}
                    renderItem={({ item }) => <LisAgenda data={item} />}
                    keyExtractor={(item) => item.ageId}
                />     
            </View>
            
        </View>
    )
}