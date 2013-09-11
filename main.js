borrar();
function aler()
{	
	var instrucciones = document.getElementById("instrucciones").value;
	var instrucciones=instrucciones.split("\n");
	var confInicial= instrucciones[0];
	var vaciado= document.getElementById("vaciado");
	vaciado.innerHTML="";
	confInicial=confInicial.split(" ")
	confInicial.unshift(0);
	var arg1, arg2, arg3, outOf=999999999999999999999;
	for (k=1;k<confInicial.length;k++)
		vaciado.innerHTML += confInicial[k] + " ";
	var i=1;
	while(i<instrucciones.length)
	{
		soloNumeros= instrucciones[i].split(",");
		for(var h=0;h<soloNumeros.length;h++)
			soloNumeros[h]=soloNumeros[h].replace(/\D/g,'');;
			
		arg1= parseInt(soloNumeros[0]);
		arg2= parseInt(soloNumeros[1]);
		arg3= parseInt(soloNumeros[2]);
		
		switch(instrucciones[i][0])
		{
			case "T":				
				if(arg1 > confInicial.length)
				{
					alert("Error Linea: "+ i + " Mensaje: Registros inexistentes\nTerminando Ejecucion [0x119217]")
					i= outOf;
				}
				else{
					while(arg2 >= confInicial.length )
					{
						confInicial.push(0)
					}
					confInicial[arg2]= confInicial[arg1];
					vaciado.innerHTML+= "\n";
					for (k=1;k<confInicial.length;k++)
						vaciado.innerHTML += confInicial[k]+ " ";
				}
			i++;
			break;
			case "S":
				while (arg1>= confInicial.length )
				{
					confInicial.push(0)
				}
				confInicial[arg1]++;
				vaciado.innerHTML+= "\n";
				for (k=1;k<confInicial.length;k++)
					vaciado.innerHTML += confInicial[k]+ " ";			
				i++;	
			break;
			case "Z":
				if(arg1 > confInicial.length)
				{
					alert("Error Linea: "+ i + " Mensaje: Registros inexistentes\nTerminando Ejecucion [0x7234223]")
					i= outOf;
				}
				else{
					confInicial[arg1]=0;
					i++;
					vaciado.innerHTML+= "\n";
					for (k=1;k<confInicial.length;k++)
						vaciado.innerHTML += confInicial[k]+ " ";		
				}
			break;
			case "J":
				if ((arg1 >= confInicial.length && arg1 >=1)||(arg2 >= confInicial.length && arg2 >=1) )
				{
					alert("Error Linea: "+ i + " Mensaje: algunos de los registros no han sido delcarados\n"+
					"La posicion " + arg1 + " o " + arg2 +" no se encuentra inicializada\nTerminando Ejecucion [0x119217]")
					
					i= outOf ;
				} else{
					if (confInicial[arg1]==confInicial[arg2]) {
						i=arg3;
					}
					else
						i++;
				}	
			break;
			i++;
			default:
			alert("instruccion inexistente en la linea: "+ i  +" \nFunciones definidas: Z S T J\nTerminando Ejecucion [0x3249234]");
			i=outOf;
			break;	
		}		
	}

}
function ej1()
{
	borrar();
	document.getElementById("instrucciones").innerHTML= "4 0 0\nJ(1,2,6),\nS3\nS(2                    )\nS(2)  comentarios\nJ1,    1,   1)\nT(3,1)" ;
}
function ej2()
{	
	borrar();
	document.getElementById("instrucciones").innerHTML= "9 17 0\nJ3,2,             5\nS1\nS(3)\nJ(1,1,1)" ;
}
function ej3()
{	
	borrar();
	document.getElementById("instrucciones").innerHTML= "5 0 0\nT(1,2)\nJ( 2,3,6)\nS(1)\nS(3)\nJ(1, 1, 2)" ;
}
function ej4()
{
	borrar();
	document.getElementById("instrucciones").innerHTML+= "16 0 0 0\nJ( 1,4,9)\nS(3)\nJ(1, 3, 7)\nS(2)\nS(3)\nJ(1,1,3)\nT(2,1)" ;
}
function borrar()
{
	document.getElementById("instrucciones").innerHTML="";
	document.getElementById("vaciado").innerHTML="";
}
