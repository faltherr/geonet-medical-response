import React, { Component } from 'react';
import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';

const styles = {
  fontFamily: 'sans-serif',
  padding: '15px'
};

class Slideout extends Component{
  constructor() {
    super();
    this.state = {
      isOpen: false
    }
  }
  openSlider = () => {
    this.setState({
      isOpen: true
    });
  }
  closeSlider = () => {
    this.setState({
      isOpen: false
    });
  }
  render () {
    return (
      <div style={styles}>
        <button onClick={this.openSlider}>Open Slider</button>
        <Slider
          title='test title'
          footer={
            <div style={{padding: '15px'}}>
              <button onClick={this.closeSlider}>Close Slider</button>
            </div>
          }
          isOpen={this.state.isOpen}
          onOutsideClick={this.closeSlider}>
          <div style={{padding: '15px'}}>
            <h3>Some scrollable content</h3>
            <p>
              Lorem ipsum dolor sit amet, ne postea feugiat vim, graeco tractatos facilisis quo ei. Eu ludus dolores vel, posse explicari cum an, in eripuit placerat torquatos eam. Eam ex nulla quodsi suavitate, pro in corrumpit inciderint. Ei nullam viderer nam.

              Rebum omittam deseruisse ei mel. In audiam invenire eos, malis dolorum suavitate et nec. Est habeo persius molestie ex, mel id dolor platonem dissentiunt. His evertitur neglegentur ut, fugit scripta interesset vim ut, no sit equidem ornatus habemus. Esse quot elitr per at. Vis eu inermis consulatu, an duo scripta maiorum. Singulis liberavisse vix cu, te quod abhorreant mei.

              Eu sit liber choro legere. Quo id errem saperet, adhuc adipiscing vix ei, eum quot natum honestatis ei. Vide movet ex vim. Sit at tation legere putent, vidisse petentium assueverit quo et. Stet putent semper te pri, porro erant menandri duo et.

              Eam mutat sensibus ad, te quo noster atomorum, posse etiam vis ut. Etiam vitae vocent at duo. Nam simul facilis interesset ad, nostrum necessitatibus eum ex. Eos ullum graeci salutandi id. Cu argumentum voluptatibus mea.

              Amet eius dissentiet ut pri, no pri purto dicit. Usu ipsum omittam te, ad nec possim numquam nominati, id alii tota iisque pri. An animal epicuri has. Et sed vocibus epicuri disputando, eripuit sensibus ad duo. Eos impetus euripidis ei, sit at impetus detracto erroribus.
              
              Lorem ipsum dolor sit amet, ne postea feugiat vim, graeco tractatos facilisis quo ei. Eu ludus dolores vel, posse explicari cum an, in eripuit placerat torquatos eam. Eam ex nulla quodsi suavitate, pro in corrumpit inciderint. Ei nullam viderer nam.

              Rebum omittam deseruisse ei mel. In audiam invenire eos, malis dolorum suavitate et nec. Est habeo persius molestie ex, mel id dolor platonem dissentiunt. His evertitur neglegentur ut, fugit scripta interesset vim ut, no sit equidem ornatus habemus. Esse quot elitr per a
              
              Eu sit liber choro legere. Quo id errem saperet, adhuc adipiscing vix ei, eum quot natum honestatis ei. Vide movet ex vim. Sit at tation legere putent, vidisse petentium assueverit quo et. Stet putent semper te pri, porro erant menandri duo et.

              Eam mutat sensibus ad, te quo noster atomorum, posse etiam vis ut. Etiam vitae vocent at duo. Nam simul facilis interesset ad, nostrum necessitatibus eum ex. Eos ullum graeci salutandi id. Cu argumentum voluptatibus mea.

            </p>
          </div>
          </Slider>
      </div>
      );
  };
}

export default Slideout
