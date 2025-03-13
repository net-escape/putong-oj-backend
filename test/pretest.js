require('dotenv-flow').config()
const process = require('node:process')
const Contest = require('../models/Contest')
const Discuss = require('../models/Discuss')
const Group = require('../models/Group')
const ID = require('../models/ID')
const News = require('../models/News')
const Problem = require('../models/Problem')
const Solution = require('../models/Solution')
const Tag = require('../models/Tag')
const User = require('../models/User')
const { generatePwd } = require('../utils/helper')
const { removeall } = require('./helper')
const meta = require('./meta')
require('../config/db')

const ContestSeed = require('./seed/contest')
const discussSeeds = require('./seed/discuss')
const newsSeeds = require('./seed/news')
const problemSeeds = require('./seed/problems')
const solutionSeed = require('./seed/solutions')
const tagSeeds = require('./seed/tags')
const userSeeds = require('./seed/users')

async function main () {
  await removeall()
  await Promise.all([
    new ID({
      id: 999,
      name: 'Problem',
    }).save(),
    new ID({
      id: 0,
      name: 'Solution',
    }).save(),
    new ID({
      id: 0,
      name: 'Group',
    }).save(),
    new ID({
      id: 0,
      name: 'News',
    }).save(),
    new ID({
      id: 0,
      name: 'Discuss',
    }).save(),
    new ID({
      id: 0,
      name: 'Contest',
    }).save(),
  ])

  const groups = Promise.all(
    meta.groups.map(item => new Group(item).save()))

  const news = Promise.all(
    newsSeeds.data.map(item => new News(item).save()),
  )

  const users = Promise.all(
    Object.values(userSeeds.data).map((user) => {
      return new User(Object.assign(user, {
        pwd: generatePwd(user.pwd),
      })).save()
    }))

  const tags = Promise.all(
    Object.values(tagSeeds.data).map((tag) => {
      return new Tag(tag).save()
    }),
  )

  // NOTE: run this in sequence
  const problems = Promise.resolve().then(async () => {
    for (const problem of problemSeeds.data) {
      await new Problem(problem).save()
    }
  })

  const discuss = Promise.resolve().then(async () => {
    for (const dis of discussSeeds.data) {
      await new Discuss(dis).save()
    }
  })

  const solutions = Promise.resolve().then(async () => {
    for (const s of solutionSeed.data) {
      await new Solution(s).save()
    }
  })

  const contests = Promise.resolve().then(async () => {
    for (const con of ContestSeed.data) {
      await new Contest(con).save()
    }
  })

  return Promise.all([
    users,
    tags,
    news,
    problems,
    discuss,
    solutions,
    contests,
    groups,
  ])
}

main()
  .then(() => {
    process.exit(0)
  })
