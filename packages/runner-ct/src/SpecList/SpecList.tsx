import React, { useState } from 'react'

import cs from 'classnames'
import { SpecItem } from './SpecItem'
import { OnSelectSpec } from './SpecFileItem'
import { SearchSpec } from './components/SearchSpec'
import { makeSpecHierarchy } from './make-spec-hierarchy'
import './spec-list.scss'

interface SpecsListProps {
  selectedSpecs: string[]
  specs: Cypress.Cypress['spec'][]
  onSelectSpec: OnSelectSpec
  disableTextSelection: boolean
}

export const SpecList: React.FC<SpecsListProps> = (props) => {
  const [search, setSearch] = useState('')
  const filteredSpecs = props.specs.filter((spec) => spec.name.toLowerCase().includes(search))
  const hierarchy = makeSpecHierarchy(filteredSpecs)

  return (
    <>
      <SearchSpec
        value={search}
        onSearch={setSearch}
      />
      <ul
        data-cy="specs-list"
        className={cs('specs-list', { 'specs-list_text-selection-disabled': props.disableTextSelection })}
      >
        {
          hierarchy.map((item) => (
            <SpecItem
              key={item.shortName}
              selectedSpecs={props.selectedSpecs}
              item={item}
              onSelectSpec={props.onSelectSpec}
            />
          ))
        }
      </ul>
    </>
  )
}
