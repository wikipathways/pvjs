import { find, forOwn, fromPairs, omit, toPairs } from "lodash";
//import { BridgeDb, XrefsAnnotationPanel } from "bridgedb";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { get, isString } from "lodash/fp";
// TODO look at how to properly import this so it works
// for both es5, esnext, tree-shaking, etc.
//import { Kaavio } from "kaavio";
import { Kaavio } from "kaavio/esnext/Kaavio";

// The edge drawing definitions are in Kaavio because they can be generically used.
// But the icons and markers are specific to Pvjs (less likely to useful to other applications).
import * as themePlain from "./themes/plain/theme";
import * as themeDark from "./themes/dark/theme";
// TODO make the CLI do this
const ContainerCustomStyle = require("./themes/styles/Container.css");
const DiagramCustomStylePlain = require("./themes/styles/Diagram.plain.css");
const DiagramCustomStyleDark = require("./themes/styles/Diagram.dark.css");

themePlain["containerStyle"] = ContainerCustomStyle;
themeDark["containerStyle"] = ContainerCustomStyle;
themePlain["diagramStyle"] = DiagramCustomStylePlain;
themeDark["diagramStyle"] = DiagramCustomStyleDark;
const themeFor = {
  plain: themePlain,
  dark: themeDark
};

// TODO use TS types updated for version 16. But I also have some changes
// I made for SVG attributes that need to get merged.
const Fragment = React["Fragment"];

// TODO move this into utils
// Create a string of citation numbers for display,
// delimited by commas, and
// replacing any consecutive series of numbers with the
// first and last joined by a hyphen.
function createPublicationXrefString(displayNumbers) {
  var publicationXrefString;
  if (displayNumbers.length === 1) {
    publicationXrefString = displayNumbers[0];
  } else {
    displayNumbers.sort(function(a, b) {
      return a - b;
    });
    var i = 0;
    publicationXrefString = displayNumbers[i].toString();

    if (displayNumbers.length > 2) {
      do {
        i += 1;

        if (
          displayNumbers[i - 1] + 1 !== displayNumbers[i] ||
          displayNumbers[i] + 1 !== displayNumbers[i + 1]
        ) {
          if (i !== 1) {
            if (displayNumbers[i - 2] + 2 === displayNumbers[i]) {
              publicationXrefString += "-" + displayNumbers[i].toString();
            } else {
              publicationXrefString += ", " + displayNumbers[i].toString();
            }
          } else {
            publicationXrefString += ", " + displayNumbers[i].toString();
          }
        }
      } while (i < displayNumbers.length - 2);
    }

    i += 1;

    if (displayNumbers[i - 2] + 2 === displayNumbers[i]) {
      publicationXrefString += "-" + displayNumbers[i].toString();
    } else {
      publicationXrefString += ", " + displayNumbers[i].toString();
    }
  }

  return publicationXrefString;
}

export class Pvjs extends React.Component<any, any> {
  kaavioRef: any;
  detailsPanelRef: any;

  constructor(props) {
    super(props);
    this.state = {
      theme: props.theme || "plain",
      hidden: props.hidden,
      highlighted: props.highlighted,
      pathway: props.pathway,
      entitiesById: props.entitiesById,
      detailPanelOpen: false,
      selected: null
    };
  }

  closeActive() {
    this.setState({ selected: null, detailPanelOpen: false });
  }

  handleEntityClick = entity => {
    const { onEntityClick, detailPanelEnabled = true } = this.props;
    if (onEntityClick) onEntityClick(entity);

    if (
      entity.type.indexOf("DataNode") > -1 &&
      entity.xrefIdentifier &&
      entity.xrefDataSource
    ) {
      this.setState({ selected: entity, detailPanelOpen: detailPanelEnabled });
    }
  };

  componentWillMount() {}

  shouldComponentUpdate(nextProps, nextState) {
    const prevProps = this.props;
    const prevState = this.state;

    return [
      "pathway.id",
      "pathway.version",
      "selected",
      "detailPanelOpen",
      "theme"
    ].reduce(function(acc, item) {
      const getter = get(item);
      return acc || getter(prevState) !== getter(nextState);
    }, false);
  }

  /*
  componentWillReceiveProps(nextProps) {
    const prevProps = this.props;
    if (
      nextProps.wpId !== prevProps.wpId ||
      nextProps.version !== prevProps.version
    ) {
      // Reset the state
      this.setState({
        pathway: null,
        entitiesById: null,
        filter: null,
        detailPanelOpen: false,
        selected: null
      });
    }
  }
	//*/

  componentWillUnmount() {
    // TODO cancel any pending network requests, possibly something like this:
    // this.pathwayRequest.dispose();
  }

  onKaavioReady() {
    const { onReady } = this.props;
    if (onReady) {
      const { pathway, entitiesById } = this.state;
      onReady(entitiesById);
    }
  }

  handleCloseDetailsPanel() {
    this.setState({ detailPanelOpen: false });
  }

  renderDetailsPanel() {
    const { pathway, entitiesById, selected, detailPanelOpen } = this.state;
    if (!detailPanelOpen) return null;

    if (window.hasOwnProperty("XrefPanel")) {
      if (!!selected.xrefDataSource && !!selected.xrefIdentifier) {
        window["XrefPanel"]["show"](
          this.detailsPanelRef,
          selected.xrefIdentifier,
          selected.xrefDataSource,
          pathway.organism,
          {
            "0": selected.textContent
          }
        );
      }
    }

    /*
    return (
      <XrefsAnnotationPanel
        key="details-panel"
        bridgeDb={new BridgeDb()}
        organism={pvjson.organism}
        entityType={!!selected && selected.wpType}
        displayName={!!selected && selected.textContent}
        dataSource={selected && selected.xrefDataSource}
        identifier={!!selected && selected.xrefIdentifier}
        handleClose={_ => this.handleCloseDetailsPanel()}
      />
    );
	//*/
  }

  renderKaavio() {
    const { pathway, entitiesById, theme } = this.state;
    const {
      wpId,
      showPanZoomControls,
      highlightedEntities,
      hiddenEntities,
      zoomedEntities,
      pannedEntities,
      panCoordinates,
      zoomLevel,
      onPanZoomChange,
      panZoomLocked
    } = this.props;

    return (
      <Kaavio
        theme={themeFor[theme]}
        pathway={pathway}
        entitiesById={entitiesById}
        onReady={function() {
          // Do something
        }}
        onEntityClick={this.handleEntityClick}
      />
    );

    /*
    return (
      <Kaavio
        ref={kaavio => (this.kaavioRef = kaavio)}
        onEntityClick={this.handleEntityClick}
        entities={pvjson.entities}
        name={pvjson.name}
        width={pvjson.width}
        height={pvjson.height}
        backgroundColor={pvjson.backgroundColor}
        customStyle={customStyle}
        edgeDrawers={EdgeDrawers}
        icons={icons}
        markerDrawers={markerDrawers}
        filters={filters}
        highlightedEntities={highlightedEntities}
        hiddenEntities={hiddenEntities}
        pannedEntities={pannedEntities}
        zoomedEntities={zoomedEntities}
        panCoordinates={panCoordinates}
        zoomLevel={zoomLevel}
        onPanZoomChange={onPanZoomChange}
        panZoomLocked={panZoomLocked}
        onReady={kaavio => this.onKaavioReady()}
        showPanZoomControls={showPanZoomControls}
      />
    );
    //*/
  }

  render() {
    const { state } = this;
    return (
      <Fragment>
        <div
          ref={div => {
            this.detailsPanelRef = div;
          }}
        />
        {this.renderDetailsPanel()}
        {this.renderKaavio()}
      </Fragment>
    );
  }
}
