import React, { useRef } from 'react'
import { FlatList, View } from 'react-native'

import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'

import Sidebar from './components/Sidebar'

export default function AlphaFlatList (props) {
    const flatListRef = useRef()

    function onScroll (activeLetter) {
        if (activeLetter) {
            let index = props.data.findIndex(item => item[props.scrollKey].toUpperCase().charAt(0).localeCompare(activeLetter) === 0)

            if (index !== -1) {
                const options = {
                    animated: false,
                    offset: index * props.itemHeight,
                }

                flatListRef.current.scrollToOffset(options)
            }
        }
    }

    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

    if (props.displayOnlyAvailableLetters) {
        letters = [...new Set(props.data.map(item => item[props.scrollKey].toUpperCase().charAt(0)))]
    }

    return (
        <View style={[props.containerStyle]}> 
            <FlatList
                {...props}
                ref={flatListRef}
                style={[props.listStyle]}
            />

            <Sidebar
                letters={letters}
                onScroll={debounce(onScroll)}
                sidebarContainerStyle={props.sidebarContainerStyle}
                sidebarLetterContainerStyle={props.sidebarLetterContainerStyle}
                sidebarLetterContainerActiveStyle={props.sidebarLetterContainerActiveStyle}
                sidebarLetterStyle={props.sidebarLetterStyle}
                sidebarLetterActiveStyle={props.sidebarLetterActiveStyle}
            />
        </View>
    )
}

AlphaFlatList.propTypes = {
    data: PropTypes.array,
    scrollKey: PropTypes.string,
    itemHeight: PropTypes.number,
    listStyle: PropTypes.object,
    displayOnlyAvailableLetters: PropTypes.bool,
    containerStyle: PropTypes.object,
    sidebarContainerStyle: PropTypes.object,
    sidebarLetterContainerStyle: PropTypes.object,
    sidebarLetterContainerActiveStyle: PropTypes.object,
    sidebarLetterStyle: PropTypes.object,
    sidebarLetterActiveStyle: PropTypes.object,
}

AlphaFlatList.defaultProps = {
    scrollKey: 'name',
    itemHeight: 20,
}
