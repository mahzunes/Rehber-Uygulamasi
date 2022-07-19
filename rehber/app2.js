//Sınıflar ile aynı projeyi yapma

class Kisi{
    constructor(ad,soyad,mail){
        this.ad=ad;
        this.soyad=soyad;
        this.mail=mail;
    }
}


class Util{
    static bosAlanKontrolEt(...alanlar){
        let sonuc=true;
alanlar.forEach(alan=>{
if(alan.length===0){
    sonuc=false;
    return false;
}
});
return sonuc;
    }

}

class Ekran{
 constructor(){
    this.ad=document.getElementById('ad');
    this.soyad=document.getElementById('soyad');
    this.mail=document.getElementById('mail');
    this.kaydetGuncelle=document.querySelector('.kaydetGuncelle');
    this.form=document.getElementById('form-rehber').addEventListener('submit',this.kaydetGuncelle);
    this.kisiListesi=document.querySelector(".kisi-listesi");

    this.depo=new Depo();

 }   

 kisiyiEkranaEkle(kisi){
const olusturulanTr=document.createElement('tr');
olusturulanTr.innerHTML=` <td>${kisi.ad}</td>
<td>${kisi.soyad}</td>
<td>${kisi.mail}</td>
<td>
    <button class=" btn btn--delete">
    <i class="fa-solid fa-trash-can"></i>
    </button>

    <button class="btn btn--edit">
        <i class="far fa-edit"></i>
    </button>
    
</td>`;
 }

 kaydetGuncelle(e){
    e.preventDefault();
    console.log('calisti');
    const kisi=new Kisi(this.ad.value,this.soyad.value,this.mail.value);
    const sonuc=Util.bosAlanKontrolEt(kisi.ad,kisi.soyad,kisi.mail);

    //tüm alanlar doldurulmus
    if(sonuc){
this.kisiyiEkranaEkle(kisi);
    }
    //bazı alanlar eksik
    else{

    }

}

}






class Depo{
    //uygulama ılk acıldıgında verileri getirme
    constructor(){
        this.tumKisiler=[];
    }


    verileriGetir(){
let tumKisilerLocal;
if(localStorage.getItem('tumKisiler')===null){
tumKisilerLocal=[];
}
else
{
tumKisilerLocal=JSON.parse(localStorage.getItem('tumKisiler'));
}

this.tumKisiler=tumKisilerLocal;
return tumKisilerLocal;

}

kisiEkle(kisi){

const tumKisilerLocal=this.verileriGetir();
tumKisilerLocal.push(kisi);
localStorage.setItem('tumKisiler',JSON.stringify(tumKisilerLocal));


} 



}


document.addEventListener('DOMContentLoaded',function(e){
const ekran=new Ekran();
});
