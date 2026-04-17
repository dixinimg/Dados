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

// Importando as faces do dado com os novos nomes
const fotosDado = [
  require('./assets/lado1.png'),
  require('./assets/lado2.png'),
  require('./assets/lado3.png'),
  require('./assets/lado4.png'),
  require('./assets/lado5.png'),
  require('./assets/lado6.png'),
];

// Lógica de cores baseada no valor (exigência do professor)
function definirCorDeFundo(valor: number): string {
  if (valor >= 1 && valor <= 3) {
    return '#FDE2E4'; // Cor mais leve (Rosa claro)
  }
  return '#C5A3FF'; // Cor mais forte (Lilás/Roxo)
}

export default function App() {
  // Estados para controlar o dado atual e o bloqueio de repetição
  const [dadoAtual, setDadoAtual] = useState<number>(1);
  const [dadoAnterior, setDadoAnterior] = useState<number>(1);

  // Função disparada ao clicar no dado
  function rolarDado() {
    setDadoAnterior(dadoAtual); // Salva a jogada anterior

    let resultadoSorteio = 0;

    // Estrutura de repetição para impedir números iguais seguidos
    do {
      resultadoSorteio = Math.floor(Math.random() * 6) + 1;
    } while (resultadoSorteio === dadoAtual);

    setDadoAtual(resultadoSorteio);
  }

  // Define a cor da tela toda vez que o dadoAtual muda
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

        {/* Texto exato exigido pelo professor */}
        <Text style={estilos.textoSorteado}>
          Você tirou o número {dadoAtual}!
        </Text>
        
      </View>
    </SafeAreaView>
  );
}

// Estilização simplificada e com visual diferente
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