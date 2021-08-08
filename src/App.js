import '@shoelace-style/shoelace/dist/themes/base.css';

import SlButton from '@shoelace-style/react/dist/button';
import SlSelect from '@shoelace-style/react/dist/select';
import SlMenuItem from '@shoelace-style/react/dist/menu-item';
import SlRange from '@shoelace-style/react/dist/range';

import Jimp from 'jimp/es';

/**
 * ADVANCED THINGS TO PLAY WITH
 * Weighted random, to make tiles look nicer: https://redstapler.co/javascript-weighted-random/ -- option 2 looks nice
 * 
 * 
 * GENERAL TODO:
 * - Implement everything that's not grass
 */

import './App.css';
import React from 'react';

const AVAILABLE_TILE_TYPES = ['grass', 'water', 'lava', 'rock', 'brick wall'];
const TILE_BACKGROUND_COLORS = {
  grass: 3,
  water: 2,
  lava: 3,
  rock: 3, 
  'brick wall': 3
}
const TILE_OPTIONS = {
  grass: [
    {name: 'Short Blades', min: 0, max: 10, type: 'range'},
    {name: 'Tall Blades', min: 0, max: 10, type: 'range'},
    {name: 'Triangles', min: 0, max: 8, type: 'range'}
  ],
  water: [
    {name: 'Lines', min: 2, max: 4, type: 'range'},
    {name: 'Deeper areas', min: 0, max: 3, type: 'range', disabled: true, defaultValue: 0}
  ],
  lava: [],
  rock: [],
  'brick wall': []
}

// Because js treats % as a remainder instead of modulus... because, sigh, programming languages were a mistake.
function modulus(a, b) {
  return ((a % b ) + b) % b;
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tileType: 'grass',
      tileProps: {},
      palette: [0x000000ff, 0x444444ff, 0xaaaaaaff, 0xffffffff],
      imageWidth: 16,
      imageHeight: 16,
      // Transparent 1px gif so we don't show a broken image
      currentTileImg: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    }
    AVAILABLE_TILE_TYPES.forEach(t => {
      this.state.tileProps[t] = {};
      TILE_OPTIONS[t].forEach(opt => {
        if (opt.defaultValue !== undefined) {
          this.state.tileProps[t][opt.name] = opt.defaultValue;
        } else {
          this.state.tileProps[t][opt.name] = Math.floor(Math.random() * (opt.max - opt.min)) + opt.min;
        }
      });
    });
  }

  componentDidMount() {
    this.reloadImage();
  }

  reRandomize() {
    let newState = {tileProps: {...this.state.tileProps}};
    AVAILABLE_TILE_TYPES.forEach(t => {
      newState.tileProps[t] = {};
      TILE_OPTIONS[t].forEach(opt => {
        if (!opt.disabled) {
          newState.tileProps[t][opt.name] = Math.floor(Math.random() * (opt.max - opt.min)) + opt.min;
        }
      });
    });
    this.setState(newState);
    this.reloadImage();
  };

  download() {
    const url = this.state.currentTileImg.replace('data:image')
  }

  getRandomImageCoords() {
    let x = Math.floor(Math.random() * this.state.imageWidth);
    let y = Math.floor(Math.random() * this.state.imageHeight);

    return {x, y};
  }

  getTileOptions(type) {
    return TILE_OPTIONS[type].map(setting => {
      if (setting.disabled) { return <span></span>; }
      switch (setting.type) {
        case 'range':
          // This could probably be a component of its
          return <div className="tile-option" key={"range-" + setting.type + setting.name}>
              <SlRange key={type + setting.name} 
                min={setting.min} 
                max={setting.max} 
                step={setting.step || 1} 
                label={setting.name} 
                value={this.state.tileProps[type][setting.name]} 
                onSlChange={e => this.updateTileState(type, setting.name, e.target.value)}>
              </SlRange>
              <div className="below-range">
                <small className="left">{setting.min}</small>
                <small className="mid">{this.state.tileProps[type][setting.name]}</small>
                <small className="right">{setting.max}</small>
              </div>
            </div>;
        default:
          console.error(`Unknown tile option type "${setting.type}" found!`, setting);
          return <span></span>;
      }
    });
  }

  getCurrentTileImage() {
    // Jimp isn't super promise friendly - technically it works but it's pretty sketchy at times. Wrap.
    return new Promise((resolve, reject) =>{
      new Jimp(16, 16, this.state.palette[TILE_BACKGROUND_COLORS[this.state.tileType]], (err, image) =>{
        if (err) { reject(err); }

        const tileOpt = this.state.tileProps[this.state.tileType];
        switch (this.state.tileType) {
          case 'grass': 
            for (let i = 0; i < tileOpt['Short Blades']; i++) {
              const {x, y} = this.getRandomImageCoords();
              image.setPixelColor(this.state.palette[2], x, y);
            }
            for (let i = 0; i < tileOpt['Tall Blades']; i++) {
              const {x, y} = this.getRandomImageCoords();
              image.setPixelColor(this.state.palette[2], x, y);
              image.setPixelColor(this.state.palette[2], x, y === 0 ? (this.state.imageHeight - 1) : y-1);
            }

            for (let i = 0; i < tileOpt['Triangles']; i++) {
              const {x, y} = this.getRandomImageCoords();

              image.setPixelColor(this.state.palette[2], x > 0 ? x-1 : (this.state.imageWidth - 1), y);
              image.setPixelColor(this.state.palette[2], x < (this.state.imageWidth - 1) ? x+1 : 0, y);
              image.setPixelColor(this.state.palette[2], x, y > 0 ? y-1 : (this.state.imageHeight - 1));
            }

          case 'water':
            for (let i = 0; i < tileOpt['Deeper areas']; i++) {
              const {x: originX, y: originY} = this.getRandomImageCoords();
              const depthR = Math.floor(Math.random() * 4) + 3;

              image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
                const dx = originX - x;
                const dy = originY - y;
                if (dx*dx + dy*dy <= (depthR*depthR)) {
                  image.setPixelColor(this.state.palette[1], x, y);
                }
              });
            }
            for (let i = 0; i < tileOpt['Lines']; i++) {
              const {x: originX, y: originY} = this.getRandomImageCoords();
              const xDiff = Math.floor(Math.random() * 2) === 1 ? 1 : -1;
              const yDiff = Math.floor(Math.random() * 2) === 1 ? 1 : -1;
              let x = originX, y = originY;
              image.setPixelColor(this.state.palette[3], x, y);
              x = modulus(x + xDiff, this.state.imageWidth);
              y = modulus(y + yDiff, this.state.imageHeight);
              while (x != originX && y != originY) {
                image.setPixelColor(this.state.palette[3], x, y);
                if (Math.random() > 0.3) {
                  x = modulus(x + xDiff, this.state.imageWidth);
                }
                if (Math.random() > 0.3) {
                  y = modulus(y + yDiff, this.state.imageHeight);
                }

              }
              image.setPixelColor(this.state.palette[3], x, y);
            }
            break;
          default: 
            console.warn('Unimplemented tile type given!', this.state.tileType, 'blank image ahoy');
        }

        image.getBase64Async('image/png').then(resolve, reject);
      });


    });
  }

  async reloadImage() {
    this.setState({currentTileImg: await this.getCurrentTileImage()});
  }

  updateTileType(event) {
    this.setState({tileType: event.target.value});
    this.reloadImage();
  }

  updateTileState(typeName, name, value) {
    this.setState({
      tileProps: {
        ...this.state.tileProps,
        [typeName]: {
          ...this.state.tileProps[typeName],
          [name]: value
        }
      }
    });
    this.reloadImage();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>2Bit Tile Generator</h1>
        </header>
        <section>
          <p>
          </p>

          <div className="control-bar">
            <SlButton onClick={() => this.reRandomize()}>Randomize Settings</SlButton>
            <SlButton onClick={() => this.reloadImage()}>Regenerate</SlButton>
          </div>

          <div className="configurator">
            <div className="left">
              <h3>Tile Preview</h3>

              <h4>Single</h4>
              {/* <div style={{width: '128px', height: '128px', border: '1px solid #000', margin: 'auto'}}></div>*/}
              <img className="tile-preview" alt="Tile Preview" src={this.state.currentTileImg}></img>
              <h4>Tiled</h4>
              <div className="tile-preview-collection">
                {[...Array(9).keys()].map(a => <img alt={"tile" + a} src={this.state.currentTileImg} key={"preview-" + a}></img>)}
              </div>
              <div className="dl-bar">
                <SlButton href={this.state.currentTileImg} download={this.state.tileType + '.png'}>Download</SlButton>
              </div>
            </div>
            <div className="right">
              <h3>Tile Configuration</h3>
              <div className = "tile-option">
                <SlSelect label="Tile Type" value={this.state.tileType} onSlChange={e => this.updateTileType(e)}>
                  {AVAILABLE_TILE_TYPES.map(a => <SlMenuItem key={a} value={a}>{a}</SlMenuItem>)}
                </SlSelect>
              </div>

              {this.getTileOptions(this.state.tileType)}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;