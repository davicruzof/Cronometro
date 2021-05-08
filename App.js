import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numero: 0,
      btn: 'Iniciar',
      ultimo: null,
    };
    // variavel de controle do setInterval
    this.timer = null;
    this.start = this.start.bind(this);
    this.clear = this.clear.bind(this);
  }

  start() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
      this.setState({btn: 'Iniciar'});
    } else {
      this.setState({btn: 'Parar'});
      this.timer = setInterval(() => {
        this.setState({numero: this.state.numero + 0.1});
      }, 100);
    }
  }
  clear() {
    this.setState({btn: 'Iniciar', ultimo: this.state.numero, numero: 0});
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./src/cronometro.png')} style={styles.img} />
        <Text style={styles.time}>{this.state.numero.toFixed(1)}</Text>
        <View style={styles.btnArea}>
          <TouchableOpacity
            style={[
              styles.botao,
              this.state.btn != 'Parar' ? styles.botaoStart : styles.botaoStop,
            ]}
            onPress={this.start}>
            <Text style={styles.btnTexto}>{this.state.btn}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.botao, styles.botaoClear]}
            onPress={this.clear}>
            <Text style={styles.btnTexto}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.areaUltimo}>
          <Text style={styles.textoUltimo}>
            {this.state.ultimo &&
              'Último tempo: ' + this.state.ultimo.toFixed(1) + 's'}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00aeef',
  },
  time: {
    marginTop: -160,
    color: '#fff',
    fontSize: 65,
    fontWeight: 'bold',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 150,
    height: 45,
  },
  botao: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 9,
  },
  botaoStart: {
    backgroundColor: 'green',
  },
  botaoStop: {
    backgroundColor: 'red',
  },
  botaoClear: {
    backgroundColor: '#ccc',
  },
  btnTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  areaUltimo: {
    marginTop: 40,
  },
  textoUltimo: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#fff',
    fontWeight: 'bold',
  },
});
