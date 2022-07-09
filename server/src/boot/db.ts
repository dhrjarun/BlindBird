import dataSource from '../data-source'

export default async () => {
  try {
    await dataSource.initialize()
    console.log('database initialization successfull')
  } catch (err) {
    console.log('some error occured while initializing the database', err)
  }
}
