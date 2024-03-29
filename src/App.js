import React from 'react';

// Shoelace components
import '@shoelace-style/shoelace/dist/themes/light.css';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlSelect from '@shoelace-style/shoelace/dist/react/select';
import SlOption from '@shoelace-style/shoelace/dist/react/option';
import SlTooltip from '@shoelace-style/shoelace/dist/react/tooltip';

// Services
import ImageGenerator from './services/image-generator';

// Custom components
import TileSetting from './components/tile-setting';
import TiledImage from './components/tiled-image';
import MapPreviewButton from './components/map-preview-button';
import DownloadDropdown from './components/download-dropdown';

// Constants
import { TILE_NAMES, TILE_OPTIONS, AVAILABLE_TILE_TYPES, DEFAULT_TILE_TYPE } from './constants/tile-constants';
import { getPalette } from './constants/palette-constants';

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.12.0/cdn/')

import './App.css';
// Huge app component that could probably be broken down well if I got smart with a Store for state
class App extends React.Component {

  // Initializer, mostly sets up initial state of the application
  constructor(props) {
    super(props);
    this.state = {
      tileType: DEFAULT_TILE_TYPE,
      tileProps: {},
      // Default palette, if one is not provided via options.
      palette: getPalette(0),
      // Transparent 1px gif so we don't show a broken image
      currentTileImg: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      builtTileImages: {}
    }

    // NOTE: This logic is almost-duplicated in the reRandomize method
    AVAILABLE_TILE_TYPES.forEach(t => {

      // Seriously, it's a constructor. The react docs do this. Calm down, eslint.
      // eslint-disable-next-line
      this.state.tileProps[t] = {};

      TILE_OPTIONS[t].forEach(opt => {
        if (opt.defaultValue !== undefined) {
          // eslint-disable-next-line
          this.state.tileProps[t][opt.name] = opt.defaultValue;
        } else if (opt.min !== undefined && opt.max !== undefined) {
          let val = Math.floor(Math.random() * (opt.max - opt.min +1)) + opt.min;

          // Enforce the step size in randomization
          if (opt.step) { 
            val -= (val % opt.step); 
          }
          // es-lint-disable-next-line
          this.state.tileProps[t][opt.name] = val;
        }
      });
      this.state.builtTileImages[t] = null;
    });


    // Try to retrieve the last tile you were using to restore state
    try {
      const lastTileType = localStorage.getItem('2bit-tile-generator__tileType');
      if (lastTileType !== null) {
        this.state.tileType = lastTileType;
      }
    } catch (e) {
      console.info('Failed getting information from localStorage, sticking to default', e);
    }
  }

  // Generate the images as soon as this is rendered (else we'll call setState too early)
  async componentDidMount() {
    for (let i = 0; i < AVAILABLE_TILE_TYPES.length; i++) {
      await this.generateTileImage(AVAILABLE_TILE_TYPES[i], false);
    }

    this.reloadImage();
  }

  // NOTE: This logic is almost-duplicated in the constructor, with defaults and without the disabled check.
  reRandomize() {
    let newState = {tileProps: {...this.state.tileProps}};
    AVAILABLE_TILE_TYPES.forEach(t => {
      newState.tileProps[t] = {...this.state.tileProps[t]};
      TILE_OPTIONS[t].forEach(opt => {
        if (!opt.disabled) {
          if (opt.min !== undefined && opt.max !== undefined) {
            let val = Math.floor(Math.random() * (opt.max - opt.min + 1)) + opt.min;

            // Enforce the step sizein randomization
            if (opt.step) { 
              val -= (val % opt.step); 
            }

            newState.tileProps[t][opt.name] = val;
          }
        }
      });
    });
    this.setState(newState, this.reloadImage);
  };

  async generateTileImage(tileType, force = false) {
    let palette = this.state.palette;
    if (this.state.tileProps[tileType].Palette) {
      palette = getPalette(this.state.tileProps[tileType].Palette);
    }
    if (this.state.builtTileImages[tileType] === null || force) {
      let res = await ImageGenerator.generateImage(tileType, this.state.tileProps[tileType], palette);
      this.setState({builtTileImages: {
        ...this.state.builtTileImages,
        [tileType]: res
      }});
      return res;
    }
    return this.state.builtTileImages[tileType];

  }

  // Redraw the image based on current state.
  async getCurrentTileImage(force = false) {
    return await this.generateTileImage(this.state.tileType, force);
  }

  // Rebuild the image shown on the page from available settings.
  async reloadImage(force = true) {
    this.setState({currentTileImg: await this.getCurrentTileImage(force)});
  }

  // Helper function to do exactly what it says. Regenerates the image when it's done.
  updateTileType(event) {
    this.setState({tileType: event.target.value}, () => this.reloadImage(false));
    localStorage.setItem('2bit-tile-generator__tileType', event.target.value);
  }

  // Helper to update state values from the various components that we support.
  updateTileState(typeName, name, value) {
    // Test to make sure the value changed to avoid infinite loops from radio buttons triggering this repeatedly
    if (this.state.tileProps[typeName][name] === value) { 
      return;
    }

    // React will stomp any nested objects when you use this, so we have to bring in the old state
    this.setState({
      tileProps: {
        ...this.state.tileProps,
        [typeName]: {
          ...this.state.tileProps[typeName],
          [name]: value
        }
      }
    }, this.reloadImage);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>2Bit Tile Generator</h1>
        </header>
        <section>

          <div className="control-bar">
            <MapPreviewButton tileImages={this.state.builtTileImages}></MapPreviewButton>
            <DownloadDropdown tileImages={this.state.builtTileImages} tileProps={this.state.tileProps}></DownloadDropdown>

            <SlTooltip content="Randomize the settings for all tiles.">
              <SlButton onClick={() => this.reRandomize()}>Randomize Settings</SlButton>
            </SlTooltip>
            <SlTooltip content="Regenerate tile image with the current settings">
              <SlButton onClick={() => this.reloadImage(true)}>Regenerate</SlButton>
            </SlTooltip>
          </div>

          <div className="configurator">
            <div className="left">
              <h3>Tile Preview</h3>

              <h4>Single</h4>
              <img className="tile-preview" alt="Tile Preview" src={this.state.currentTileImg}></img>
              <h4>Tiled</h4>
              <TiledImage tileId={this.state.tileType} tileImages={this.state.builtTileImages}></TiledImage>
              <div className="dl-bar">
                <SlButton href={this.state.currentTileImg} download={this.state.tileType + '.png'}>Download</SlButton>
              </div>
            </div>
            <div className="right">
              <h3>Tile Configuration</h3>
              <div className="tile-option">
                <SlSelect label="Tile Type" value={this.state.tileType} onSlChange={e => this.updateTileType(e)} className="tile-type-select">
                  {AVAILABLE_TILE_TYPES.map(a => <SlOption key={a} value={a}>{TILE_NAMES[a]} <img alt="" slot="suffix" src={this.state.builtTileImages[a]}></img> </SlOption>)}
                </SlSelect>
              </div>

              {TILE_OPTIONS[this.state.tileType].map(setting => 
                <TileSetting 
                  key={this.state.tileType + setting.name}
                  setting={setting} 
                  state={this.state} 
                  tileTypeId={this.state.tileType} 
                  updateTileState={(a, b, c) => this.updateTileState(a, b, c)
                }></TileSetting>
              )}
            </div>
          </div>
        </section>
        <footer>
          <p>
            Heavily inspired by <a href="https://0x72.itch.io/2bitcharactergenerator" target="_blank">0x72's 2BitCharactersGenerator</a>. 
            UI powered by <a href="https://shoelace.style/" target="_blank">Shoelace</a>.
          </p>

          <p>
            All images generated by this tool are free for use. (CC0) Tool available under the MIT license. (
            <a href="https://gh.nes.science/2bit-tile-generator" target="_blank">Source</a> • {' '}
            <a href="https://gh.nes.science/2bit-tile-generator/issues" target="_blank">Feature Requests</a>) 
            </p>
          <p>Wanna see the other stuff I do? Check out <a href="https://nes.science" target="_blank">nes.science</a>.</p>
          <SlTooltip content="Click for changelog">
            <a className="version" href="https://gh.nes.science/2bit-tile-generator/blob/main/CHANGELOG.md" target="_blank">version {process.env.REACT_APP_VERSION}</a>
          </SlTooltip>
        </footer>
      </div>
    );
  }
}

export default App;
