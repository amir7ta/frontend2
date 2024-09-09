import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchCategoriesHirearchyByRoute, selectCategoriesHirearchyForFilter} from '../../store/reducers/categorySlice';

const TreeNode = ({ node, level, isSelected, onToggle, onUserClick }) => {
  return (
    <div className={`tree-node ${isSelected ? 'open' : ''}`} style={{ paddingRight: `${level * 20}px` }}>
      <div
        className={`tree-node-title ${isSelected ? 'selected' : ''} ${node.hasRightEdge ? 'right-edge' : ''}  ${isSelected && node.hasRightEdge? 'selected-colored' : ''}`}
        onClick={() => onToggle(node)}
      >
        {/* <Link onClick={()=>onUserClick(node)}>
          <span>{node.title}</span>
        </Link> */}
        <a href={`/shop/${node.route}`} >
        <span>{node.title}</span>
                          </a>
      </div>
    </div>
  );
};

const Tree = ({ onChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryRoute } = useParams();
  const data = useSelector(selectCategoriesHirearchyForFilter); 
  const [selectedNodes, setSelectedNodes] = useState({});
  const [nodesToRender, setNodesToRender] = useState([]);

  useEffect(() => {
    if (!data) return;

    const initialSelectedNodes = {};
    const stack = [...data.map(node => ({ ...node, level: 0, hasRightEdge: false }))];
    const nodesToRenderTemp = [];

    // Traverse the tree
    while (stack.length) {
      const node = stack.pop();

      // Check for selected route
      if (categoryRoute && node.route === categoryRoute) {
        let currentNode = node;
        while (currentNode) {
          initialSelectedNodes[currentNode.key] = true;
          const parentNode = stack.find(n => n.key === currentNode.parentKey);
          currentNode = parentNode ? parentNode : null;
        }
      }

      // Set rightEdge property
      if (node.children && node.children.length > 1) {
        node.hasRightEdge = true;
      }

      // Add node to nodesToRenderTemp
      nodesToRenderTemp.push(node);

      // Add children to stack
      for (const child of (node.children || []).slice().reverse()) {
        stack.push({
          ...child,
          level: node.level + 1,
          parentKey: node.key,
          hasRightEdge: node.hasRightEdge,
        });
      }
    }

    setSelectedNodes(initialSelectedNodes);
    setNodesToRender(nodesToRenderTemp);
  }, [dispatch, data, categoryRoute]);

  const handleToggle = (node) => {
    const newSelectedNodes = {};
    // Mark the selected node and its parents as selected
    if (node) {
      newSelectedNodes[node.key] = true;
      let parentKey = node.parentKey;
      while (parentKey) {
        newSelectedNodes[parentKey] = true;
        const parentNode = nodesToRender.find(node => node.key === parentKey);
        parentKey = parentNode ? parentNode.parentKey : null;
      }
    }

    setSelectedNodes(newSelectedNodes);
  };

  const handleBackClick= () => {
    // if(selectedRoute && selectedRoute!==''){
      setSelectedNodes({});
      onChange(null);
    // }
  };

  const handleNodeClick= (node) => {
    if(categoryRoute!==node.route)
    onChange(node.route);
  };

  // useEffect(() => {
  //   if (selectedRoute) {
  //     const node = nodesToRender.find(node => node.route === selectedRoute);
  //     if (node) {
  //       handleToggle(node);
  //       handleNodeClick(node)
  //     }
  //   }
  //   else{
  //     setSelectedNodes([])
  //   }
  // }, [selectedRoute]);

  return (
    <div className="tree">
      {data && data.length>0 && (
         <div className='tree-node-title-back'>
          <a href={`/shop`} >
            <span>تمام محصولات</span>
          </a>
         {/* {categoryRoute && (<span>تمام محصولات</span>)} */}
       </div>
      )}
      {nodesToRender.map(node => (
        <TreeNode
          key={node.key}
          node={node}
          level={node.level}
          isSelected={selectedNodes[node.key]}
          onToggle={handleToggle}
          onUserClick={handleNodeClick}
        />
      ))}
    </div>
  );
};

export default Tree;
