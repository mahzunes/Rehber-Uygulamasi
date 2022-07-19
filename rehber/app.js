// arayüz elementlerini seçelims

const ad=document.getElementById('ad');
const soyad=document.getElementById('soyad');
const mail=document.getElementById('mail');
const form=document.getElementById('form-rehber');
const kisiListesi=document.querySelector('.kisi-listesi');

//event listener tanımlama

form.addEventListener('submit',kaydet);
kisiListesi.addEventListener('click',kisiIslemleriniYap);

// tüm  kisiler için dizi
const tumKisilerDizisi=[];

let secilenSatir=undefined;


function kisiIslemleriniYap(event){
    if(event.target.classList.contains('btn--delete')){
        const silinecekTr=event.target.parentElement.parentElement;
        const silinecekMail=event.target.parentElement.previousElementSibling.textContent;
        rehberdenSil(silinecekTr,silinecekMail);
    }else if(event.target.classList.contains('btn--edit')){
        document.querySelector('.kaydetGuncelle').value='Guncelle';
        const secilenTR=event.target.parentElement.parentElement;
        const guncellenecekMail=secilenTR.cells[2].textContent;

        ad.value=secilenTR.cells[0].textContent;
        soyad.value=secilenTR.cells[1].textContent;
        mail.value=secilenTR.cells[2].textContent;

        secilenSatir=secilenTR;
        console.log(tumKisilerDizisi);
    }
}


function rehberdenSil(silinecekTrElement,silinecekMail){

    //silinecekTrElement.remove();
    console.log(silinecekTrElement,silinecekMail);
    

    //maile gore silme işlemi

    //YONTEM-1
    tumKisilerDizisi.forEach(function(kisi,index){
if(kisi.mail===silinecekMail){
    tumKisilerDizisi.splice(index,1);
}
    });


//YONTEM-2
//     const silinmeyecekKisiler=tumKisilerDizisi.filter(function(kisi,index){
// return kisi.mail!==silinecekMail;
//     });

//     tumKisilerDizisi.length=0;
//     tumKisilerDizisi.push(...silinmeyecekKisiler);



    alanlariTemizle();
    document.querySelector('.kaydetGuncelle').value='Kaydet';
}


function kaydet(e){
    e.preventDefault();
    
    const eklenecekKisi={
        ad:ad.value,
        soyad:soyad.value,
        mail:mail.value,
    }


    const sonuc=verileriKontrolEt(eklenecekKisi);
    if (sonuc.durum){

        if(secilenSatir){
            
            kisiyiGuncelle(eklenecekKisi);

        }else{
            kisiyiEkle(eklenecekKisi);
        }

        kisiyiEkle(eklenecekKisi);

      
    }else{
        bilgiOlustur(sonuc.mesaj,sonuc.durum);
        
    }


}

function kisiyiGuncelle(kisi){
    // kisi parametresinde secilen kisinin yeni degerleri vardır.
    // secilen satırda da eski değerler var...

    for(let i=0;i<tumKisilerDizisi.length;i++){
        if(tumKisilerDizisi[i].mail===secilenSatir.cells[2]){
            tumKisilerDizisi[i]=kisi;
            break;
        }
    }


    secilenSatir.cells[0].textContent=kisi.ad;
    secilenSatir.cells[1].textContent=kisi.soyad;
    secilenSatir.cells[2].textContent=kisi.mail;

    document.querySelector('.kaydetGuncelle').value='Kaydet';
    secilenSatir=undefined;
    console.log(tumKisilerDizisi);


}


function kisiyiEkle(eklenecekKisi){
    const olusturulanTrElementi=document.createElement('tr');
    olusturulanTrElementi.innerHTML=` <td>${eklenecekKisi.ad}</td>
    <td>${eklenecekKisi.soyad}</td>
    <td>${eklenecekKisi.mail}</td>
    <td>
        <button class=" btn btn--delete">
        <i class="fa-solid fa-trash-can"></i>
        </button>

        <button class="btn btn--edit">
            <i class="far fa-edit"></i>
        </button>
        
    </td>`;

    kisiListesi.appendChild(olusturulanTrElementi);
    bilgiOlustur('Başarılı',durum=true);
    tumKisilerDizisi.push(eklenecekKisi);

    console.log(tumKisilerDizisi); 



}

function verileriKontrolEt(kisi){
    
    //objelerde in kullanımı(obje içindeki değerleri tek tek gezmeye yarar.)
    for(const deger in kisi){
        if(kisi[deger]){
            console.log(kisi[deger]);
        }
        else{
            const sonuc={
                durum:false,
                mesaj:'Boş alan bırakmayınız'
            }
            return sonuc;
            
        }
    }
    alanlariTemizle();
    return {
        durum:true,
        mesaj:''
    }

}


function bilgiOlustur(mesaj,durum){

    const olusturulanBilgi=document.createElement('div');
    olusturulanBilgi.textContent=mesaj;
    document.querySelector('.container').insertBefore(olusturulanBilgi,form);
    olusturulanBilgi.className='bilgi';
    if(durum){
        olusturulanBilgi.classList.add('bilgi--success');
    }else{
        olusturulanBilgi.classList.add('bilgi--error');
    }

    //setTimeOut , setInterval

    setTimeout(function(){
        const silinecekDiv=document.querySelector('.bilgi');
        if(silinecekDiv){
            silinecekDiv.remove();
        }
    },2000);

    


}


function alanlariTemizle(){
    ad.value='';
    soyad.value='';
    mail.value='';
}



