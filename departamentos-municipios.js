const departamentos={
  "Cundinamarca":["Bogotá","Soacha","Chía","Zipaquirá"],
  "Antioquia":["Medellín","Envigado","Bello","Rionegro"]
};

const depSelect=document.getElementById('departamento');
const munSelect=document.getElementById('municipio');

for(const d in departamentos){
  const opt=document.createElement('option');
  opt.value=d; opt.textContent=d;
  depSelect.appendChild(opt);
}

depSelect.addEventListener('change',()=>{
  const mun=departamentos[depSelect.value]||[];
  munSelect.innerHTML="";
  mun.forEach(m=>{
    const opt=document.createElement('option');
    opt.value=m; opt.textContent=m;
    munSelect.appendChild(opt);
  });
});
