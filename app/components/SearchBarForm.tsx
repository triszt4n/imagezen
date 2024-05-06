'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Input, Select, SelectItem } from '@nextui-org/react'

export default function SearchBarForm() {
  return (
    <>
      <Input
        type="text"
        label="Search"
        labelPlacement="outside"
        startContent={<MagnifyingGlassIcon className="h-4 w-4" />}
        isClearable
        classNames={{ base: 'max-w-md' }}
      />
      {/* <DateRangePicker
        label="Last updated between"
        labelPlacement="outside"
        visibleMonths={2}
      /> */}
      <Select
        labelPlacement="outside"
        label="Sort by"
        placeholder="Select a sorting option"
        classNames={{ base: 'max-w-64' }}
      >
        {['asd', 'fgh', 'jkl'].map((sortBy) => (
          <SelectItem key={sortBy} value={sortBy}>
            {sortBy}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
