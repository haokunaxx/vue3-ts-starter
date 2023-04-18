import { useSettingsStore } from '@/store/settings'
enum LayoutMode {
  MODE_LEFT = 'mode_left',
  MODE_NONE = 'mode_none',
  MODE_TOP_POP = 'mode_top_pop',
  MODE_LEFT_POP = 'mode_left_pop',
  MODE_LEFT_TOP = 'mode_left_top',
  MODE_TOP_LEFT = 'mode_top_left'
}

enum LayoutElem {
  ELEM_HEADER_APPLICATION = 'header_application',
  ELEM_HEADER_MENU = 'header_menu',
  ELEM_APPLICATION = 'application',
  ELEM_MENU = 'menu'
}

export function useLayout() {
  const layouts = {
    [LayoutMode.MODE_LEFT]: {
      mode: LayoutMode.MODE_LEFT,
      layout: [LayoutElem.ELEM_APPLICATION, LayoutElem.ELEM_MENU],
      title: '',
      img: '',
      tip: ''
    },
    [LayoutMode.MODE_NONE]: {
      mode: LayoutMode.MODE_NONE,
      layout: [LayoutElem.ELEM_MENU],
      title: '',
      img: '',
      tip: ''
    },
    [LayoutMode.MODE_LEFT_POP]: {
      mode: LayoutMode.MODE_LEFT_POP,
      layout: [LayoutElem.ELEM_APPLICATION],
      title: '',
      img: '',
      tip: ''
    },
    [LayoutMode.MODE_TOP_POP]: {
      mode: LayoutMode.MODE_TOP_POP,
      layout: [LayoutElem.ELEM_HEADER_APPLICATION],
      title: '',
      img: '',
      tip: ''
    },
    [LayoutMode.MODE_TOP_LEFT]: {
      mode: LayoutMode.MODE_TOP_LEFT,
      layout: [LayoutElem.ELEM_HEADER_APPLICATION, LayoutElem.ELEM_MENU],
      title: '',
      img: '',
      tip: ''
    },
    [LayoutMode.MODE_LEFT_TOP]: {
      mode: LayoutMode.MODE_LEFT_TOP,
      layout: [LayoutElem.ELEM_HEADER_MENU, LayoutElem.ELEM_APPLICATION],
      title: '',
      img: '',
      tip: ''
    }
  }

  const settingsStore = useSettingsStore()

  const isMultiApplication = settingsStore.isMultiApplication

  const layoutMode = ref<LayoutMode>(
    isMultiApplication ? LayoutMode.MODE_LEFT_POP : LayoutMode.MODE_NONE
  )

  // const layout = ref<LayoutElem[]>(LayoutElem[layoutMode.value].layout)

  const layout = computed(() => layouts[layoutMode.value].layout)

  const changeLayout = (newLayoutMode: LayoutMode) => {
    layoutMode.value = newLayoutMode
  }

  const includes = (list: string[], target: string) => {
    let ret = false
    for (let i = 0; i < list.length; i++) {
      if (list[i] === target) {
        ret = true
        break
      }
    }
    return ret
  }

  const headerApplicationShow = computed(() =>
    includes(layout.value, LayoutElem.ELEM_HEADER_APPLICATION)
  )

  const applicationIsPopMenu = computed(() => {
    return [LayoutMode.MODE_LEFT_POP, LayoutMode.MODE_TOP_POP].includes(
      layoutMode.value
    )
  })

  const headerMenuShow = computed(() =>
    includes(layout.value, LayoutElem.ELEM_HEADER_MENU)
  )

  const applicationShow = computed(() =>
    includes(layout.value, LayoutElem.ELEM_APPLICATION)
  )

  const sidebarShow = computed(() =>
    includes(layout.value, LayoutElem.ELEM_MENU)
  )

  const filterLayouts = computed(() => {
    if (isMultiApplication) {
      return layouts
    } else {
      return Object.keys(layouts).reduce((prev, next) => {
        if (
          !includes(
            [
              LayoutMode.MODE_LEFT,
              LayoutMode.MODE_TOP_LEFT,
              LayoutMode.MODE_LEFT_TOP
            ],
            layouts[next].mode
          )
        ) {
          prev[next] = layouts[next]
        }
        return prev
      }, {} as typeof layouts)
    }
  })
  console.log(filterLayouts)
  // changeLayout([...defaultLayout])
  // changeLayout([LayoutElem.ELEM_HEADER_APPLICATION, LayoutElem.ELEM_MENU])

  return {
    layout,
    // layouts,
    layouts: filterLayouts,
    changeLayout,
    headerApplicationShow,
    headerMenuShow,
    applicationShow,
    sidebarShow,
    applicationIsPopMenu
  }
}
