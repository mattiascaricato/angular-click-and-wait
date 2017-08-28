/* global angular:false, inject:false, expect:false */
/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
import clickAndWait from './click-and-wait';

describe('clickAndWait', () => {
  let $timeout;
  let scope;
  let element;
  const asyncActionDelay = 1000;

  beforeEach(angular.mock.module(clickAndWait));

  beforeEach(inject((_$rootScope_, _$timeout_, _$compile_) => {
    scope = _$rootScope_.$new();
    $timeout = _$timeout_;
    scope.asyncAction = () => $timeout(angular.noop, asyncActionDelay);

    element = _$compile_('<button click-and-wait="asyncAction()"></button>')(scope);
  }));

  it('does not disable the button until it\'s clicked', () => {
    expect(element.prop('disabled')).to.be.false;
    element.triggerHandler('click');
    expect(element.prop('disabled')).to.be.true;
  });

  it('disables the button until the async action is finished', () => {
    element.triggerHandler('click');
    $timeout.flush(asyncActionDelay - 1);
    expect(element.prop('disabled')).to.be.true;
    $timeout.flush(1);
    expect(element.prop('disabled')).to.be.false;
  });
});
