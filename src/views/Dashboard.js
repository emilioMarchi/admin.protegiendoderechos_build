import React, {useState, useEffect} from 'react'
import axios from 'axios'
import * as moment from 'moment';
import 'moment/locale/es';
import './dashboard.css'


export const Dashboard = () => {

    const [msjData, setMsjData] = useState()
    const [navState, setNavState] = useState()

    const formatDate = (date) => {
        moment.locale('es');  
        var newDate = moment(date);
        return newDate.format('LLLL')
    }

    const host = 'https://api.protegiendoderechos.com.ar/'

    useEffect(()=>{
        setNavState('mensajes')
        axios.get(`${host}form/formQueryes`)
        .then((res) => {
            setMsjData(res.data)
            console.log(res.data)
            
        })
    },[])

    return(
        <>
            <div className='panel-header'>
                <p>Panel administrador</p>
            </div>
            <div className='panel-body'>
                <div className='panel-sidebar'>
                <div className={navState==='mensajes'?'sidebar-item active' : 'sidebar-item'} onClick={
                    ()=>{setNavState('mensajes')}
                }>
                    <p>Mensajes</p>
                </div>
                </div>
                <div className='panel-container'>
                    <div className='msj-list'>
                        {
                            msjData ? 
                            msjData.map((item)=>{
                                
                                return(
                                    <div className='msj-item'>
                                        <div className='item-header'>
                                            <p>Fecha: <b>{formatDate(item.queryDate)}</b></p>
                                            <p>Nombre: <b>{item.userName}</b></p>
                                            <p>Email: <b>{item.userEmail}</b></p>    
                                        </div>
                                        <div className='item-body'>
                                            
                                            <p>Consulta: <b>{item.userQuery}</b></p>
                                        </div>

                                        
                                    </div>
                                )
                            })
                            : 'Esperando información...'
                        }
                                        


                    </div>
                </div>
            </div>
        </>
    )
}