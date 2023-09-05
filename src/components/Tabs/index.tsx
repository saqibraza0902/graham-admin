import React from 'react'
import type { IconType } from 'react-icons'
export type TabsProps = {
    title: string
    onClick?: () => void
    icon?: React.ReactNode
}
const Tabs = ({ tabs }: { tabs: TabsProps[] }) => {
    return (
        <div className='flex items-center gap-5 overflow-auto'>
            {
                tabs.map((tab, index) => (
                    <div onClick={() => {
                        if (tab.onClick) {
                            tab.onClick()
                        }
                    }} key={index} className='rounded-lg border-2 border-black p-3 flex items-center gap-3 cursor-pointer'>
                        {tab.icon}
                        <h1 className='text-xs'>{tab.title}</h1>
                    </div>
                ))
            }
        </div>
    )
}

export default Tabs