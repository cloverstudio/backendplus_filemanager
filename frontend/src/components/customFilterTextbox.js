import React, { Component } from "react";
import { 
    Input, 
    Button, 
    Icon, 
    Highlighter
 } from 'antd';

export default (dataIndex,dataLabel) => {

    var searchInput = null;

    return {
       
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
            <Input
                ref={node => {
                    searchInput = node;
                }}
                placeholder={`Search ${dataLabel}`}
                value={selectedKeys}
                onChange={e => setSelectedKeys(e.target.value ? e.target.value : "")}
                style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
                type="primary"
                icon="search"
                size="small"
                style={{ width: 90, marginRight: 8 }}
                onClick={e => confirm()}
            >
                Search
            </Button>
            <Button 
                size="small" style={{ width: 90 }}
                onClick={e => {
                    searchInput ? searchInput.value = "" : null;
                    clearFilters();
                }}
            >
                Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {

            }
        }

    }

}