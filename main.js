function aler()
{	
	var instrucciones = document.getElementById("instrucciones").value;					//se comienza a procesar el cuadro de texto
	var instrucciones=instrucciones.split("\n");										//las separamos por líneas
	var confInicial= instrucciones[0];													//la primera parte guarda solo ros registros iniciales
	var vaciado= document.getElementById("vaciado");
	vaciado.innerHTML="";
	confInicial=confInicial.split(" ")													//guarda en un arreglo la configuración inicial, donde cada posicón es especificada por un espacio
	confInicial.unshift(0);																//agrega un elemento al principio de la lista para evitar confilcto con los índices
	var arg1, arg2, arg3, outOf=999999999999999999999;									//definimos las variables que se utilizarán
	for (k=1;k<confInicial.length;k++)
		vaciado.innerHTML += confInicial[k] + " ";										//se muestra la configuración inicial
	var i=1;																			//se declara i con uno porque indica que empezará en la instrucción 1
	while(i<instrucciones.length)														//entramos en un while, que comenzará con la primera instrucción y aumentará gradualmente hasta llegar al total de instrucciones
	{																					//esto para que la instrucción J pueda decir hacia donde saltar.
		soloNumeros= instrucciones[i].split(",");										//Preprocesamiento de cada fila, se separarán los elementos por coma, se eliminan los espacios en blanco y caracteres que no sean números
		for(var h=0;h<soloNumeros.length;h++)
			soloNumeros[h]=soloNumeros[h].replace(/\D/g,'');;
			
		arg1= parseInt(soloNumeros[0]);													//Se toman los numeros hallados para procesarlos en base a la instrucción
		arg2= parseInt(soloNumeros[1]);
		arg3= parseInt(soloNumeros[2]);
		
		switch(instrucciones[i][0])
		{
			case "T":				
				if(arg1 > confInicial.length)																			//manejo de excepcion
				{
					alert("Error Linea: "+ i + " Mensaje: Registros inexistentes\nTerminando Ejecucion [0x119217]")		//si se quiere transferir de un registro no inicializado
					i= outOf;			//se envía un número muy grande, se supone que ya no habrá tantas instrucciones y eso obliga a terminar el while, por lo tanto, la ejecución del programa
				}
				else{
					while(arg2 >= confInicial.length )		//en caso que no exista la posición de envío, serán añadidos nuevos registros con valor cero hasta llegar al destino.
					{
						confInicial.push(0)
					}
					confInicial[arg2]= confInicial[arg1];	//ésta es la instrucción que ejecuta la función T
					vaciado.innerHTML+= "\n";				//si fue exitoso, imprimiremos un salto de línea y el arreglo con la nueva configuración
					for (k=1;k<confInicial.length;k++)
						vaciado.innerHTML += confInicial[k]+ " ";
				}
			i++;										//salta a la siguiente instrucción
			break;
			case "S":
				while (arg1>= confInicial.length )		//de igual manera, si no existe se crea y después se efectúa la operación
				{
					confInicial.push(0)
				}
				confInicial[arg1]++;
				vaciado.innerHTML+= "\n";
				for (k=1;k<confInicial.length;k++)
					vaciado.innerHTML += confInicial[k]+ " ";		//imprime el resultado	
				i++;												//salta a la siguiente instrucción
			break;
			case "Z":
				if(arg1 > confInicial.length)    //control de excepción, si se quiere operar un registo inexistente, el programa termina
				{
					alert("Error Linea: "+ i + " Mensaje: Registros inexistentes\nTerminando Ejecucion [0x7234223]")
					i= outOf;					//al asignar un valor muy grande.
				}
				else{							//de lo contrario ejecuta la operación, imprime y sigue con el programa
					confInicial[arg1]=0;
					i++;
					vaciado.innerHTML+= "\n";
					for (k=1;k<confInicial.length;k++)
						vaciado.innerHTML += confInicial[k]+ " ";		
				}
			break;
			case "J":
				if ((arg1 >= confInicial.length && arg1 >=1)||(arg2 >= confInicial.length && arg2 >=1) )					//manejo de excepción, no se puede comparar algo que no exista, ya sea uno u otro o ambos.
				{
					alert("Error Linea: "+ i + " Mensaje: algunos de los registros no han sido delcarados\n"+
					"La posicion " + arg1 + " o " + arg2 +" no se encuentra inicializada\nTerminando Ejecucion [0x119217]")
					
					i= outOf ;																								//salir de la ejecución
				} else{
					if (confInicial[arg1]==confInicial[arg2]) {						//si son iguales ambos registros, la variable i, que guarda la instrucción actual
						i=arg3;														//ahora valdrá lo que indique el tercer argumento y comenzará con ciclos
					}
					else
						i++;														// de lo contrario continuará con la ejecución del programa
				}	
			break;
			i++;																	//incremento necesario para permitir múltiples argumentos aunque el programador no pueda explicarlo
			default:
			alert("instruccion inexistente en la linea: "+ i  +" \nFunciones definidas: Z S T J\nTerminando Ejecucion [0x3249234]");
			i=outOf;							//manejo de excepción en caso de introducir algún caracter no válido o en minúsculas.
			break;	
		}		
	}

}
function ej1()										//las siguientes líneas sólo muesstran en pantalla los ejemplos
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
function borrar()									//vaciía los cuadros de texto para que puedan ser otra vez utilizados
{
	document.getElementById("instrucciones").innerHTML="";
	document.getElementById("vaciado").innerHTML="";
}
