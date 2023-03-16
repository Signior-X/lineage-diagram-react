import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { DEFAULT_FLOW_TABLES } from './components/lineage/constants';

class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}


window.ResizeObserver = ResizeObserver;

test('renders table3 only in the start with select', () => {
  const result = render(<App />);

  // Test that select is present
  const select = result.container.querySelector("select");
  expect(select).toBeTruthy();

  // Test that only one node is visible
  let reactFlowNodes = result.container.querySelectorAll(".react-flow__node");
  expect(reactFlowNodes.length).toBe(1);

  const firstNode = reactFlowNodes[0];
  const dataId = firstNode.getAttribute("data-id");
  expect(dataId).toBe("table3");
});

test('expanding backward works', () => {
  const result = render(<App />);
  let reactFlowNodes = result.container.querySelectorAll(".react-flow__node");
  expect(reactFlowNodes.length).toBe(1);

  const firstNode = reactFlowNodes[0];
  // Expect first button to expand the previous table
  const tables = DEFAULT_FLOW_TABLES();
  const firstButton = firstNode.querySelector("button");
  expect(firstButton).toBeTruthy();
  fireEvent.click(firstButton as HTMLButtonElement);

  reactFlowNodes = result.container.querySelectorAll(".react-flow__node");
  expect(reactFlowNodes.length).toBe(3);

  const dataIds: string[] = [];
  reactFlowNodes.forEach((flowNode) => {
    const dataId = flowNode.getAttribute("data-id");
    dataIds.push(dataId ? dataId : "");
  });

  const expectedOpen: string[] = [...tables["table3"].sources];
  expectedOpen.push("table3");
  expect(dataIds.sort()).toEqual(expectedOpen.sort());
});
