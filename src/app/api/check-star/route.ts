import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { username } = await request.json()

        if (!username) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 })
        }

        // Check all stargazers to find the username
        let page = 1
        let found = false
        const perPage = 100 // Maximum allowed per page

        while (!found) {
            const response = await fetch(`https://api.github.com/repos/terminalsin/no-cluely/stargazers?per_page=${perPage}&page=${page}`, {
                headers: {
                    'Accept': 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28',
                    'User-Agent': 'NoCluely-Website'
                }
            })

            if (response.status !== 200) {
                if (response.status === 422) {
                    return NextResponse.json({ error: 'Validation failed or endpoint has been spammed' }, { status: 422 })
                }
                return NextResponse.json({ error: 'GitHub API error' }, { status: 500 })
            }

            const stargazers = await response.json()

            // If no stargazers returned, we've reached the end
            if (stargazers.length === 0) {
                break
            }

            // Check if username is in this page of stargazers
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            found = stargazers.some((stargazer: any) =>
                stargazer.login.toLowerCase() === username.toLowerCase()
            )

            // If not found and we got a full page, check the next page
            if (!found && stargazers.length === perPage) {
                page++
            } else {
                break
            }
        }

        return NextResponse.json({ starred: found })
    } catch (error) {
        console.error('Error checking star status:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
} 