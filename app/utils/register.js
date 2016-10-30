import React from 'react';

const _extensions = {};
const _pages = {};

export const EXT = 1;
export const PAGE = 2;

export function getComponentName(component){
  return component.name;
}

export function getComponentForExt(ext){
  return _extensions[ext] ? _extensions[ext].container() : false;
}

export function getComponentForPage(page){
  return _pages[page] ? _pages[page].container() : false;
}

export function getComponent(componentInfo){
  const source = componentInfo.source.toLowerCase();
  const Component = componentInfo.type === EXT ?
    getComponentForExt(source) : getComponentForPage(source);
  if(!Component) throw new Error('No component found');
  return <Component meta={componentInfo.meta}/>
}

export function extension(ext, component){
  _extensions[ext.toLowerCase()] = component;
}

export function page(page, component){
  _pages[page.toLowerCase()] = component;
}
