'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    Entry = require('./explorer/entry'),
    DragEvent = require('./dragEvent'),
    FileMarker = require('./explorer/entry/fileMarker'),
    DirectoryMarker = require('./explorer/entry/directoryMarker');

class DroppableElement extends Element {
  constructor(selector, moveHandler) {
    super(selector);
    
    this.moveHandler = moveHandler;

    this.droppableElements = [];
  }

  addDroppableElement(droppableElement) {
    this.droppableElements.push(droppableElement);
  }

  removeDroppableElement(droppableElement) {
    var index = indexOf(this.droppableElements, droppableElement);

    if (index !== null) {
      this.droppableElements.splice(index, 1);
    }
  }

  isOverlappingDraggableElement(draggableElementDraggingBounds) {
    var bounds = this.getBounds(),
        overlappingDraggableElement = bounds.areOverlapping(draggableElementDraggingBounds);

    return overlappingDraggableElement;
  }

  onDragEvent(dragEvent) {
    var action = dragEvent.getAction(),
        draggableElement = dragEvent.getDraggableElement(),
        entry = draggableElement;  ///

    switch (action) {
      case DragEvent.actions.START_DRAGGING:
        return this.startDragging(entry);

      case DragEvent.actions.STOP_DRAGGING:
        this.stopDragging(entry);
        break;

      case DragEvent.actions.DRAGGING:
        this.dragging(entry);
        break;
    }
  }

  startDragging(entry) {
    if (this.hasMarker()) {
      return false;
    }

    this.addMarker(entry);

    return true;
  }

  stopDragging(entry) {
    this.removeMarkerGlobally();
  }

  dragging(entry) {
    if (this.hasMarker()) {
      var notToHaveMarker = !this.isToHaveMarker(entry);

      if (notToHaveMarker) {
        var droppableElementToHaveMarker = this.getDroppableElementToHaveMarker(entry);

        if (droppableElementToHaveMarker !== null) {
          droppableElementToHaveMarker.addMarker(entry);

          this.removeMarker();
        }
      }
    } else {
      var droppableElementHavingMarker = this.getDroppableElementHavingMarker();

      droppableElementHavingMarker.dragging(entry);

      var droppableElementHavingMarkerIsNotToHaveMarker = !droppableElementHavingMarker.isToHaveMarker(entry);

      if (droppableElementHavingMarkerIsNotToHaveMarker) {
        droppableElementHavingMarker.removeMarker();

        this.addMarkerInPlace(entry);
      }
    }
  }

  isToHaveMarker(entry) {
    var bounds = this.getBounds(),
        draggingBounds = entry.getDraggingBounds(),
        overlappingDraggingBounds = bounds.areOverlapping(draggingBounds),
        toHaveMarker = overlappingDraggingBounds; ///

    return toHaveMarker;
  }

  getDroppableElementToHaveMarker(entry) {
    var droppableElementToHaveMarker = this.droppableElements.reduce(function(droppableElementToHaveMarker, droppableElement) {
      if (droppableElementToHaveMarker === null) {
        if (droppableElement.isToHaveMarker(entry)) {
          droppableElementToHaveMarker = droppableElement;
        }
      }

      return droppableElementToHaveMarker;
    }, null);

    return droppableElementToHaveMarker;
  }

  getDroppableElementHavingMarker() {
    var droppableElementHavingMarker = this.droppableElements.reduce(function(droppableElementHavingMarker, droppableElement) {
      if (droppableElementHavingMarker === null) {
        if (droppableElement.hasMarker()) {
          droppableElementHavingMarker = droppableElement;
        }
      }

      return droppableElementHavingMarker;
    }, null);

    return droppableElementHavingMarker;
  }

  addMarker(entry) {
    var entryName = entry.getName(),
        entryType = entry.getType(),
        markerName = entryName, ///
        marker;

    switch (entryType) {
      case Entry.types.FILE:
        marker = FileMarker.clone(markerName);
        break;

      case Entry.types.DIRECTORY:
        marker = DirectoryMarker.clone(markerName);
        break;
    }

    this.append(marker);
  }

  removeMarker() {
    var marker = this.retrieveMarker();

    marker.remove();
  }

  removeMarkerGlobally() {
    if (this.hasMarker()) {
      this.removeMarker();
    } else {
      var droppableElementHavingMarker = this.getDroppableElementHavingMarker();

      droppableElementHavingMarker.removeMarker();
    }
  }

  hasMarker() {
    var marker = this.retrieveMarker();

    return marker !== null;
  }

  retrieveMarker() {
    var childElements = this.childElements(),
        marker = childElements.reduce(function(marker, childElement) {
          if (marker === null) {
            if ((childElement instanceof FileMarker)
                || (childElement instanceof DirectoryMarker)) {
              marker = childElement;  ///
            }
          }

          return marker;
        }, null);

    return marker;
  }

  moveEntries(entries, sourcePath, targetPath, done) {
    var entryPathMaps = entries.map(function(entry) {
      var entryPath = entry.getPath(),
          sourceEntryPath = entryPath,  ///
          targetEntryPath = targetPath === null ?
                              null :
                                util.replaceTopPath(entryPath, sourcePath, targetPath); ///
      
      var entryPathMap = {};

      entryPathMap[sourceEntryPath] = targetEntryPath;
      
      return entryPathMap;
    });
      
    this.moveHandler(entryPathMaps, function() {
      entries.forEach(function(entry) {
        var entryPath = entry.getPath(),
            sourcePath = entryPath,  ///
            pathMap = find(entryPathMaps, function(entryPathMap) {
              var sourceEntryPath = sourcePath,
                  movedPath = entryPathMap[sourceEntryPath],
                  found = (movedPath !== undefined);
              
              return found;              
            }),
            movedPath = pathMap[sourcePath];
        
        this.moveEntry(entry, sourcePath, movedPath);
      }.bind(this));
    }.bind(this));
    
    done();
  }

  moveEntry(entry, sourcePath, movedPath) {
    var entryIsDirectory = entry.isDirectory();

    entryIsDirectory ?
      this.moveDirectory(entry, sourcePath, movedPath) :
        this.moveFile(entry, sourcePath, movedPath);
  }
}

module.exports = DroppableElement;

function indexOf(array, element) {
  var index = null;

  array.some(function(currentElement, currentElementIndex) {
    if (currentElement === element) {
      index = currentElementIndex;

      return true;
    } else {
      return false;
    }
  });

  return index;
}

function find(array, cb) {
  var element = null;
  
  array.some(function(currentElement) {
    if (cb(currentElement)) {
      element = currentElement;
      
      return true;
    } else {
      return false;
    }
  });
  
  return element;  
}