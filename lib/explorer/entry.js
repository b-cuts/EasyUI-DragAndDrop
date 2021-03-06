'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var NameButton = require('./nameButton');

var Entry = function (_Element) {
  _inherits(Entry, _Element);

  function Entry(selector, name, type) {
    _classCallCheck(this, Entry);

    var _this = _possibleConstructorReturn(this, (Entry.__proto__ || Object.getPrototypeOf(Entry)).call(this, selector));

    _this.nameButton = new NameButton(_this, name);

    _this.type = type;
    return _this;
  }

  _createClass(Entry, [{
    key: 'getName',
    value: function getName() {
      return this.nameButton.getName();
    }
  }, {
    key: 'getType',
    value: function getType() {
      return this.type;
    }
  }]);

  return Entry;
}(Element);

Entry.types = {
  FILE: 'FILE',
  MARKER: 'MARKER',
  DIRECTORY: 'DIRECTORY'
};

module.exports = Entry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsIk5hbWVCdXR0b24iLCJFbnRyeSIsInNlbGVjdG9yIiwibmFtZSIsInR5cGUiLCJuYW1lQnV0dG9uIiwiZ2V0TmFtZSIsInR5cGVzIiwiRklMRSIsIk1BUktFUiIsIkRJUkVDVE9SWSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxhQUFhRixRQUFRLGNBQVIsQ0FBakI7O0lBRU1HLEs7OztBQUNKLGlCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsSUFBNUIsRUFBa0M7QUFBQTs7QUFBQSw4R0FDMUJGLFFBRDBCOztBQUdoQyxVQUFLRyxVQUFMLEdBQWtCLElBQUlMLFVBQUosUUFBcUJHLElBQXJCLENBQWxCOztBQUVBLFVBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUxnQztBQU1qQzs7Ozs4QkFFUztBQUFFLGFBQU8sS0FBS0MsVUFBTCxDQUFnQkMsT0FBaEIsRUFBUDtBQUFtQzs7OzhCQUVyQztBQUNSLGFBQU8sS0FBS0YsSUFBWjtBQUNEOzs7O0VBYmlCTCxPOztBQWdCcEJFLE1BQU1NLEtBQU4sR0FBYztBQUNaQyxRQUFNLE1BRE07QUFFWkMsVUFBUSxRQUZJO0FBR1pDLGFBQVc7QUFIQyxDQUFkOztBQU1BQyxPQUFPQyxPQUFQLEdBQWlCWCxLQUFqQiIsImZpbGUiOiJlbnRyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIE5hbWVCdXR0b24gPSByZXF1aXJlKCcuL25hbWVCdXR0b24nKTtcblxuY2xhc3MgRW50cnkgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLm5hbWVCdXR0b24gPSBuZXcgTmFtZUJ1dHRvbih0aGlzLCBuYW1lKTtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lQnV0dG9uLmdldE5hbWUoKTsgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxufVxuXG5FbnRyeS50eXBlcyA9IHtcbiAgRklMRTogJ0ZJTEUnLFxuICBNQVJLRVI6ICdNQVJLRVInLFxuICBESVJFQ1RPUlk6ICdESVJFQ1RPUlknXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVudHJ5O1xuIl19