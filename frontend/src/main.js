import react from 'react';
import { useState } from 'react';
import QRCode from 'qrcode';
import './main.css';

const Qrcodegenerator=()=>{
    const [url,setUrl]=useState('');
    const [qrcode,setQrcode]=useState('');

    const GeneratorQRcode=()=>{
    QRCode.toDataURL(url,
        {
            width:400
        },(err,url)=>
    {
        if(err) return console.error(err);

        console.log(url);
        setQrcode(url);
    })
}
    return(
        <>
        <h1>QRcode GENERATOR</h1>
        <div className='main'>
            <div className='div_1'>
                <h2>DROP YOUR LINK HERE!</h2>
                <input 
                type='link' 
                placeholder='eg:www.google.com'
                value={url}
                onChange={e=>setUrl(e.target.value)}
                />
                <button onClick={GeneratorQRcode}>Generate</button>
            </div>
            <div className='div_2'>
                <h2>QR CODE</h2>
                {qrcode && <>
                <img src={qrcode}/>
                <a className='download' href={qrcode} download="qrcode.png">Download</a>
                </>}
            </div>
            </div>
        </>
    )
}

export default Qrcodegenerator;