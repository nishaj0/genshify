import { AnvilIcon } from 'genshin-optimizer/svgicons'
import { objKeyMap } from 'genshin-optimizer/util'
import { imgAssets } from 'genshin-optimizer/assets'
import {
  allArtifactSlotKeys,
  allElementKeys,
  allWeaponTypeKeys,
} from 'genshin-optimizer/consts'
import { useDBMeta, useDatabase } from 'genshin-optimizer/db-ui'
import { FlowerIcon } from 'genshin-optimizer/svgicons'
import { BusinessCenter, People } from '@mui/icons-material'
import {
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import SlotIcon from '../Components/Artifact/SlotIcon'
import CardDark from '../Components/Card/CardDark'
import CardLight from '../Components/Card/CardLight'
import ImgIcon from '../Components/Image/ImgIcon'
import { getCharSheet } from '../Data/Characters'
import { getWeaponSheet } from '../Data/Weapons'
import { ElementIcon } from '../KeyMap/StatIcon'

export default function InventoryCard() {
  const { t } = useTranslation(['page_home', 'ui'])
  const database = useDatabase()
  const { gender } = useDBMeta()
  const { characterTally, characterTotal } = useMemo(() => {
    const chars = database.chars.keys
    const tally = objKeyMap(allElementKeys, () => 0)
    chars.forEach((ck) => {
      const elementKey = getCharSheet(ck, gender).elementKey
      tally[elementKey] = tally[elementKey] + 1
    })
    return { characterTally: tally, characterTotal: chars.length }
  }, [database, gender])

  const { weaponTally, weaponTotal } = useMemo(() => {
    const weapons = database.weapons.values
    const tally = objKeyMap(allWeaponTypeKeys, () => 0)
    weapons.forEach((wp) => {
      const type = getWeaponSheet(wp.key).weaponType
      tally[type] = tally[type] + 1
    })
    return { weaponTally: tally, weaponTotal: weapons.length }
  }, [database])

  const { artifactTally, artifactTotal } = useMemo(() => {
    const tally = objKeyMap(allArtifactSlotKeys, () => 0)
    const arts = database.arts.values
    arts.forEach((art) => {
      const slotKey = art.slotKey
      tally[slotKey] = tally[slotKey] + 1
    })
    return { artifactTally: tally, artifactTotal: arts.length }
  }, [database])
  const theme = useTheme()
  const smaller = !useMediaQuery(theme.breakpoints.up('md'))

  return (
    <CardDark>
      <CardHeader
        title={<Typography variant="h5">{t`inventoryCard.title`}</Typography>}
        avatar={<BusinessCenter fontSize="large" />}
      />
      <Divider />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <CardLight>
          <CardActionArea
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 2,
              gap: 1,
              flexWrap: 'wrap',
            }}
            component={RouterLink}
            to="/characters"
          >
            <Chip
              label={
                <strong>
                  {t(`ui:tabs.characters`)} {characterTotal}
                </strong>
              }
              icon={<People />}
              sx={{
                flexBasis: smaller ? '100%' : 'auto',
                flexGrow: 1,
                cursor: 'pointer',
              }}
              color={characterTotal ? 'primary' : 'secondary'}
            />
            {Object.entries(characterTally).map(([ele, num]) => (
              <Chip
                key={ele}
                sx={{ flexGrow: 1, cursor: 'pointer' }}
                color={num ? ele : 'secondary'}
                icon={<ElementIcon ele={ele} />}
                label={<strong>{num}</strong>}
              />
            ))}
          </CardActionArea>
        </CardLight>
        <CardLight>
          <CardActionArea
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 2,
              gap: 1,
              flexWrap: 'wrap',
            }}
            component={RouterLink}
            to="/weapons"
          >
            <Chip
              label={
                <strong>
                  {t(`ui:tabs.weapons`)} {weaponTotal}
                </strong>
              }
              icon={<AnvilIcon />}
              sx={{
                flexBasis: smaller ? '100%' : 'auto',
                flexGrow: 1,
                cursor: 'pointer',
              }}
              color={weaponTotal ? 'primary' : 'secondary'}
            />
            {Object.entries(weaponTally).map(([wt, num]) => (
              <Chip
                key={wt}
                sx={{ flexGrow: 1, cursor: 'pointer' }}
                color={num ? 'success' : 'secondary'}
                icon={<ImgIcon src={imgAssets.weaponTypes?.[wt]} size={2} />}
                label={<strong>{num}</strong>}
              />
            ))}
          </CardActionArea>
        </CardLight>
        <CardLight>
          <CardActionArea
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 2,
              gap: 1,
              flexWrap: 'wrap',
            }}
            component={RouterLink}
            to="/artifacts"
          >
            <Chip
              label={
                <strong>
                  {t(`ui:tabs.artifacts`)} {artifactTotal}
                </strong>
              }
              icon={<FlowerIcon />}
              sx={{
                flexBasis: smaller ? '100%' : 'auto',
                flexGrow: 1,
                cursor: 'pointer',
              }}
              color={artifactTotal ? 'primary' : 'secondary'}
            />
            {Object.entries(artifactTally).map(([slotKey, num]) => (
              <Chip
                key={slotKey}
                sx={{ flexGrow: 1, cursor: 'pointer' }}
                color={num ? 'success' : 'secondary'}
                icon={<SlotIcon slotKey={slotKey} />}
                label={<strong>{num}</strong>}
              />
            ))}
          </CardActionArea>
        </CardLight>
      </CardContent>
    </CardDark>
  )
}