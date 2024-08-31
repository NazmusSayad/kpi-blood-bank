export default class CanvasMatrix {
  private config: CanvasMatrixConfig = { ...defaultConfig }
  private intervalCounter: NodeJS.Timeout | null = null
  private particles: { x: number; y: number; size: number }[] = []
  private context: CanvasRenderingContext2D
  private size: [number, number]

  constructor(
    canvas: HTMLCanvasElement,
    config: Partial<CanvasMatrixConfig> = {}
  ) {
    this.config = { ...this.config, ...config }

    this.context = canvas.getContext('2d')!
    if (!this.context) {
      throw new Error('Canvas 2D context is not supported')
    }

    this.size = [canvas.offsetWidth, canvas.offsetHeight]
    canvas.width = this.size[0]
    canvas.height = this.size[1]

    this.context.fillStyle = this.config.background
    this.context.fillRect(0, 0, ...this.size)

    const particleCount =
      (this.size[0] * this.size[1]) /
      this.config.size ** 2 /
      this.config.density

    for (let i = 0; i < particleCount; i++) {
      this.particles.push(this.newParticle())
    }
  }

  private newParticle() {
    return {
      x: Math.random() * this.size[0],
      y: -Math.random() * this.size[1] * 2,
      size: Math.floor(
        Math.random() * (this.config.size * 2 - this.config.size / 2) +
          this.config.size / 2
      ),
    }
  }

  private drawParticles() {
    this.context.fillStyle = getRandom(...this.config.colors)
    this.particles.forEach((particle) => {
      this.context.font = `${particle.size}px ${this.config.font}`
      const randomChar =
        this.config.characters[
          Math.floor(Math.random() * this.config.characters.length)
        ]

      this.context.fillText(randomChar, particle.x, particle.y)
    })
  }

  private updateParticles() {
    this.particles.forEach((particle) => {
      if (particle.y > this.size[1]) {
        Object.assign(particle, this.newParticle())
      } else {
        particle.y += particle.size
      }
    })
  }

  private clearCanvas() {
    this.context.globalAlpha = 0.25
    this.context.fillStyle = this.config.background
    this.context.fillRect(0, 0, ...this.size)
    this.context.globalAlpha = 1
  }

  play() {
    this.clearCanvas()
    this.drawParticles()
    this.updateParticles()

    this.intervalCounter = setTimeout(() => {
      this.play()
    }, this.config.delay)
  }

  stop() {
    this.clearCanvas()
    if (this.intervalCounter !== null) clearTimeout(this.intervalCounter)
  }
}

type CanvasMatrixConfig = {
  font: string
  size: number
  delay: number
  characters: string | string[]
  background: string
  colors: string[]
  density: number
}

const defaultConfig: CanvasMatrixConfig = {
  font: 'monospace',
  size: 12,
  delay: 75,
  characters: '01',
  background: 'transparent',
  colors: ['#0F0', '#00F'],
  density: 10,
}

function getRandom(...array: string[]) {
  return array[Math.floor(Math.random() * array.length)]
}
