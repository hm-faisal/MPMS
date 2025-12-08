import type { UserConfig } from '@commitlint/types';

/**
 * Production-ready Commitlint Configuration
 *
 * Enforces conventional commit format: <type>(<scope>): <subject>
 *
 * @see https://www.conventionalcommits.org/
 * @see https://commitlint.js.org/
 */
const configuration: UserConfig = {
	extends: ['@commitlint/config-conventional'],

	/**
	 * Custom parser options for handling special cases
	 */
	parserPreset: {
		parserOpts: {
			headerPattern: /^(\w+)(?:\(([^)]*)\))?!?: (.+)$/,
			headerCorrespondence: ['type', 'scope', 'subject'],
		},
	},

	/**
	 * Commit message validation rules
	 * Rule format: [level, applicable, value]
	 * - level: 0 (disable), 1 (warning), 2 (error)
	 * - applicable: 'always' | 'never'
	 * - value: rule-specific configuration
	 */
	rules: {
		// Header rules
		'header-max-length': [2, 'always', 100],
		'header-min-length': [2, 'always', 10],
		'header-case': [2, 'always', 'lower-case'],

		// Type rules
		'type-empty': [2, 'never'],
		'type-case': [2, 'always', 'lower-case'],
		'type-enum': [
			2,
			'always',
			[
				'feat', // New feature
				'fix', // Bug fix
				'docs', // Documentation changes
				'style', // Code style changes (formatting, semicolons, etc.)
				'refactor', // Code refactoring (neither fixes a bug nor adds a feature)
				'perf', // Performance improvements
				'test', // Adding or updating tests
				'build', // Build system or external dependencies changes
				'ci', // CI/CD configuration changes
				'chore', // Other changes that don't modify src or test files
				'revert', // Reverts a previous commit
			],
		],

		// Scope rules
		'scope-empty': [1, 'never'], // Warning instead of error for flexibility
		'scope-case': [2, 'always', 'lower-case'],
		'scope-max-length': [2, 'always', 30],

		// Subject rules
		'subject-empty': [2, 'never'],
		'subject-case': [2, 'always', 'lower-case'],
		'subject-full-stop': [2, 'never', '.'],
		'subject-exclamation-mark': [0, 'never'], // Allow breaking change indicator
		'subject-min-length': [2, 'always', 3],
		'subject-max-length': [2, 'always', 72],

		// Body rules
		'body-leading-blank': [2, 'always'],
		'body-empty': [1, 'never'], // Warning: encourage but don't enforce body
		'body-max-line-length': [2, 'always', 100],
		'body-min-length': [1, 'always', 20],
		'body-case': [0], // Disabled: allow any case in body

		// Footer rules
		'footer-leading-blank': [2, 'always'],
		'footer-empty': [0], // Optional footer
		'footer-max-line-length': [2, 'always', 100],

		// References rules (e.g., "Closes #123")
		'references-empty': [0], // Optional issue references

		// Signed-off-by rules
		'signed-off-by': [0], // Optional DCO sign-off

		// Trailer rules (e.g., "Reviewed-by: Name")
		'trailer-exists': [0], // Optional trailers
	},

	/**
	 * Custom prompt configuration for interactive commits
	 */
	prompt: {
		messages: {
			skip: ':skip',
			max: 'upper %d chars',
			min: '%d chars at least',
			emptyWarning: 'can not be empty',
			upperLimitWarning: 'over limit',
			lowerLimitWarning: 'below limit',
		},
		questions: {
			type: {
				description: "Select the type of change that you're committing:",
				enum: {
					feat: {
						description: 'A new feature',
						title: 'Features',
						emoji: '✨',
					},
					fix: {
						description: 'A bug fix',
						title: 'Bug Fixes',
						emoji: '🐛',
					},
					docs: {
						description: 'Documentation only changes',
						title: 'Documentation',
						emoji: '📚',
					},
					style: {
						description: 'Changes that do not affect the meaning of the code',
						title: 'Styles',
						emoji: '💎',
					},
					refactor: {
						description: 'A code change that neither fixes a bug nor adds a feature',
						title: 'Code Refactoring',
						emoji: '📦',
					},
					perf: {
						description: 'A code change that improves performance',
						title: 'Performance Improvements',
						emoji: '🚀',
					},
					test: {
						description: 'Adding missing tests or correcting existing tests',
						title: 'Tests',
						emoji: '🚨',
					},
					build: {
						description: 'Changes that affect the build system or external dependencies',
						title: 'Builds',
						emoji: '🛠',
					},
					ci: {
						description: 'Changes to our CI configuration files and scripts',
						title: 'Continuous Integrations',
						emoji: '⚙️',
					},
					chore: {
						description: "Other changes that don't modify src or test files",
						title: 'Chores',
						emoji: '♻️',
					},
					revert: {
						description: 'Reverts a previous commit',
						title: 'Reverts',
						emoji: '🗑',
					},
				},
			},
			scope: {
				description: 'What is the scope of this change (e.g. component or file name)',
			},
			subject: {
				description: 'Write a short, imperative tense description of the change',
			},
			body: {
				description: 'Provide a longer description of the change',
			},
			isBreaking: {
				description: 'Are there any breaking changes?',
			},
			breakingBody: {
				description: 'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
			},
			breaking: {
				description: 'Describe the breaking changes',
			},
			isIssueAffected: {
				description: 'Does this change affect any open issues?',
			},
			issuesBody: {
				description:
					'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
			},
			issues: {
				description: 'Add issue references (e.g. "fix #123", "re #123".)',
			},
		},
	},

	/**
	 * Help URL for commit message format
	 */
	helpUrl: 'https://www.conventionalcommits.org/',

	/**
	 * Ignore commits that match these patterns
	 */
	ignores: [
		(commit) => commit.includes('WIP'),
		(commit) => commit.includes('[skip ci]'),
		(commit) => commit.includes('[ci skip]'),
	],

	/**
	 * Default ignore patterns
	 */
	defaultIgnores: true,
};

export default configuration;
