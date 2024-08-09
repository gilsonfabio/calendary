import React, { useState, useEffect} from "react"
import { View, Text, Alert, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams, Link } from 'expo-router';
import { isAxiosError } from "axios"
import { api } from '@/server/api'

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

export default function NewAgenda(){
    const [agenda, setAgenda] = useState<Array<AgendaProps>>();
    const router = useRouter();
    const { idUsr, name, title } = useLocalSearchParams<paramsProps>();

    const [ageData, setAgeData] = useState('');
    const [ageHora, setAgeHora] = useState('');
    const [ageTitulo, setAgeTitulo] = useState('');
    const [ageDescricao, setAgeDescricao] = useState('');
    const [ageContato, setAgeContato] = useState('');
    const [ageCelular, setAgeCelular] = useState('');
    const [ageLogradouro, setAgeLogradouro] = useState('');
    const [ageComplemento, setAgeComplemento] = useState('');
    const [ageBairro, setAgeBairro] = useState('');
    const [ageCidade, setAgeCidade] = useState('');
    const [ageUf, setAgeUf] = useState('');
    const [ageCep, setAgeCep] = useState('');

    async function handleNewAgenda() {
        try {
          const response = await api.post(`/newagenda`, {
            ageIdUsr: idUsr,
            ageData,
            ageHora, 
            ageTitulo, 
            ageDescricao, 
            ageContato, 
            ageCelular, 
            ageLogradouro, 
            ageComplemento, 
            ageBairro, 
            ageCidade, 
            ageUf, 
            ageCep,          
          })                    
        } catch (error) {
          if (isAxiosError(error)) {
            return Alert.alert(error.response?.data)
          }
          Alert.alert("Não foi possível realizar agendamento!")
        }
        router.back();
    }
    return(
        <View className="flex-1 h-full items-center bg-slate-900 ">
            <View className="flex-col items-center mt-5">
                <View className="flex-col items-center h-1/4">
                    <Image className="w-32 h-32 mt-5" source={require('@/assets/images/logo.png')} />
                </View>                             
            </View>
            <View className="flex-col w-full items-center text-white">
                <View className="flex items-center mt-3 mb-3">
                    <Text className='text-yellow-400 text-2xl font-bold'>
                        INFORME DADOS P/ AGENDAMENTO
                    </Text>
                </View>    
            </View>    
            <ScrollView>
                <View className="flex-col items-center w-full">
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe data agendamento" 
                    onChangeText={setAgeData} 
                    value={ageData} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe hora agendamento" 
                    onChangeText={setAgeHora} 
                    value={ageHora} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe Titulo" 
                    onChangeText={setAgeTitulo} 
                    value={ageTitulo} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe Descrição" 
                    onChangeText={setAgeDescricao} 
                    value={ageDescricao} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe nome contato" 
                    onChangeText={setAgeContato} 
                    value={ageContato} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    secureTextEntry 
                    placeholder="Informe Celular" 
                    onChangeText={setAgeCelular} 
                    value={ageCelular} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    secureTextEntry 
                    placeholder="Informe Logradouro" 
                    onChangeText={setAgeLogradouro} 
                    value={ageLogradouro} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    secureTextEntry 
                    placeholder="Informe Complemento" 
                    onChangeText={setAgeComplemento} 
                    value={ageComplemento} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    secureTextEntry 
                    placeholder="Informe Celular" 
                    onChangeText={setAgeBairro} 
                    value={ageBairro} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    secureTextEntry 
                    placeholder="Informe Cidade" 
                    onChangeText={setAgeCidade} 
                    value={ageCidade} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    secureTextEntry 
                    placeholder="Informe UF" 
                    onChangeText={setAgeUf} 
                    value={ageUf} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    secureTextEntry 
                    placeholder="Informe Cep" 
                    onChangeText={setAgeCep} 
                    value={ageCep} 
                />
                <View className='flex items-center w-full p-10 '>
                    <TouchableOpacity onPress={handleNewAgenda} className='w-full h-20 '>
                        <View className="flex items-center justify-center bg-yellow-400 w-96 h-12 rounded-md">
                            <Text className="text-black font-bold text-md">Agendar</Text>
                        </View>
                    </TouchableOpacity>                      
                </View>
                </View>                              
            </ScrollView>
        </View>    
    )
}
