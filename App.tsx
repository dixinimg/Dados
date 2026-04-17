import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const fotosDado = [
  require('./assets/lado1.png'),
  require('./assets/lado2.png'),
  require('./assets/lado3.png'),
  require('./assets/lado4.png'),
  require('./assets/lado5.png'),
  require('./assets/lado6.png'),
];

function definirCorDeFundo(valor: number): string {
  if (valor >= 1 && valor <= 3) {
    return '#FDE2E4'; // cor mais leve 
  }
  return '#C5A3FF'; // cor mais forte
}

export default function App() {
  const [dadoAtual, setDadoAtual] = useState<number>(1);
  const [dadoAnterior, setDadoAnterior] = useState<number>(1);

  // função disparada ao clicar no dado
  function rolarDado() {
    setDadoAnterior(dadoAtual); // salva a jogada anterior

    let resultadoSorteio = 0;

    do {
      resultadoSorteio = Math.floor(Math.random() * 6) + 1;
    } while (resultadoSorteio === dadoAtual);

    setDadoAtual(resultadoSorteio);
  }

  const corDinamica = definirCorDeFundo(dadoAtual);

  return (
    <SafeAreaView style={[estilos.telaPrincipal, { backgroundColor: corDinamica }]}>
      <StatusBar style="auto" />

      <View style={estilos.caixaCentral}>
        
        <Text style={estilos.textoCabecalho}>Sorte</Text>

        <Text style={estilos.dicaSorteio}>
          Clique no dado para tentar a sorte!
        </Text>

        <TouchableOpacity activeOpacity={0.7} onPress={rolarDado}>
          <Image
            source={fotosDado[dadoAtual - 1]}
            style={estilos.imagemDoDado}
          />
        </TouchableOpacity>

        <Text style={estilos.textoSorteado}>
          Você tirou o número {dadoAtual}!
        </Text>
        
      </View>
    </SafeAreaView>
  );
}

// estilizacao 
const estilos = StyleSheet.create({
  telaPrincipal: {
    flex: 1,
  },
  caixaCentral: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textoCabecalho: {
    fontSize: 34,
    fontWeight: '900',
    color: '#2D3748',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  dicaSorteio: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 40,
    fontStyle: 'italic',
  },
  imagemDoDado: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  textoSorteado: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A202C',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
